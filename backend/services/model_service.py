import os
import json
import logging
import joblib
import pandas as pd
from pathlib import Path

logger = logging.getLogger(__name__)

class ModelService:
    _instance = None

    def __init__(self):
        self.pipeline = None
        self.metadata = None
        self._pipeline_load_attempted = False
        self._metadata_load_attempted = False

    @classmethod
    def get_instance(cls):
        if cls._instance is None:
            cls._instance = ModelService()
        return cls._instance

    @classmethod
    def _get_project_root(cls) -> Path:
        """Find the project root across local development and Vercel serverless environments."""
        candidates = [
            Path(__file__).resolve().parent.parent.parent,
            Path.cwd(),
            Path("/var/task"),
        ]
        for c in candidates:
            if (c / "models").exists() and (c / "models" / "best_pipeline.pkl").exists():
                return c
        return candidates[0]

    @classmethod
    def _get_models_dir(cls) -> Path:
        """Locate the models directory reliably."""
        candidates = [
            cls._get_project_root() / "models",
            Path.cwd() / "models",
            Path("/var/task/models"),
            Path(__file__).resolve().parent.parent.parent / "models",
        ]
        for c in candidates:
            if c.exists() and c.is_dir():
                return c
        return candidates[0]

    @classmethod
    def _get_artifacts_dir(cls) -> Path:
        """Locate the artifacts directory reliably."""
        candidates = [
            cls._get_project_root() / "artifacts",
            Path.cwd() / "artifacts",
            Path("/var/task/artifacts"),
            Path(__file__).resolve().parent.parent.parent / "artifacts",
        ]
        for c in candidates:
            if c.exists() and c.is_dir():
                return c
        return candidates[0]

    def _load_pipeline(self):
        self._pipeline_load_attempted = True
        pipeline_path = self._get_models_dir() / "best_pipeline.pkl"
        if pipeline_path.exists():
            try:
                # Compatibility shims for unpickling across scikit-learn and numpy versions
                try:
                    import sklearn.compose._column_transformer as ct
                    if not hasattr(ct, "_RemainderColsList"):
                        class _RemainderColsList(list):
                            pass
                        ct._RemainderColsList = _RemainderColsList
                except Exception:
                    pass

                try:
                    import sys
                    import sklearn._loss as sl
                    import sklearn._loss._loss as cl
                    for attr in dir(cl):
                        if not attr.startswith("__"):
                            setattr(sl, attr, getattr(cl, attr))
                    sys.modules["_loss"] = cl
                    sys.modules["sklearn.ensemble._hist_gradient_boosting._loss"] = cl
                except Exception:
                    try:
                        import sklearn._loss
                        import sys
                        sys.modules["_loss"] = sklearn._loss
                        sys.modules["sklearn.ensemble._hist_gradient_boosting._loss"] = sklearn._loss
                    except Exception:
                        pass

                try:
                    import sklearn.ensemble._hist_gradient_boosting as hgb
                    import sys
                    for mod_name in ["_binning", "_bitset", "_gradient_boosting", "_predictor", "common", "splitting", "histogram"]:
                        if hasattr(hgb, mod_name):
                            submod = getattr(hgb, mod_name)
                            sys.modules[mod_name] = submod
                            sys.modules[f"sklearn.ensemble._hist_gradient_boosting.{mod_name}"] = submod
                except Exception:
                    pass

                try:
                    import numpy as np
                    if not hasattr(np, "_core") and hasattr(np, "core"):
                        import sys
                        sys.modules["numpy._core"] = np.core
                        sys.modules["numpy._core.multiarray"] = np.core.multiarray
                except Exception:
                    pass

                self.pipeline = joblib.load(pipeline_path)
                logger.info(f"Loaded ML pipeline from {pipeline_path}")
                return self.pipeline
            except Exception as e:
                logger.error(f"Failed to deserialize ML pipeline from {pipeline_path}: {e}")
                self.pipeline = None
                raise
        else:
            logger.warning(f"ML Pipeline not found at {pipeline_path}")
        return None

    def _load_metadata(self):
        self._metadata_load_attempted = True
        meta_path = self._get_models_dir() / "model_metadata.json"
        if meta_path.exists():
            try:
                with open(meta_path, "r", encoding="utf-8") as f:
                    self.metadata = json.load(f)
                return self.metadata
            except Exception as e:
                logger.error(f"Failed to read model metadata from {meta_path}: {e}")
                self.metadata = {}
        return None

    def get_pipeline(self):
        if self.pipeline is None and not self._pipeline_load_attempted:
            self._load_pipeline()
        return self.pipeline

    def get_metadata(self):
        if self.metadata is None and not self._metadata_load_attempted:
            self._load_metadata()
        return self.metadata or {}

    def get_metrics(self):
        result = {}
        metrics_dir = self._get_artifacts_dir() / "metrics"
        comp_file = metrics_dir / "model_comparison.csv"
        cv_file = metrics_dir / "cross_validation.csv"
        feat_file = metrics_dir / "feature_importance.csv"
        th_file = metrics_dir / "threshold_analysis.csv"

        if comp_file.exists():
            result["model_comparison"] = pd.read_csv(comp_file).to_dict(orient="records")
        if cv_file.exists():
            result["cross_validation"] = pd.read_csv(cv_file).to_dict(orient="records")
        if feat_file.exists():
            result["feature_importance"] = pd.read_csv(feat_file).to_dict(orient="records")
        if th_file.exists():
            result["threshold_analysis"] = pd.read_csv(th_file).to_dict(orient="records")

        return result

    def get_insights(self):
        return {
            "dataset_name": "Loan Default Portfolio Dataset",
            "total_records": 255347,
            "features_count": 18,
            "numerical_features_count": 9,
            "categorical_features_count": 7,
            "missing_values": 0,
            "class_distribution": {
                "non_default_count": 225694,
                "default_count": 29653,
                "non_default_percentage": 88.38,
                "default_percentage": 11.61,
                "imbalance_ratio": "7.61 : 1"
            },
            "key_feature_ranges": {
                "Age": {"min": 18, "max": 69, "mean": 43.5},
                "Income": {"min": 15000, "max": 149999, "mean": 82499},
                "LoanAmount": {"min": 5000, "max": 249999, "mean": 127578},
                "CreditScore": {"min": 300, "max": 849, "mean": 574.3},
                "InterestRate": {"min": 2.0, "max": 25.0, "mean": 13.5},
                "DTIRatio": {"min": 0.1, "max": 0.9, "mean": 0.50}
            },
            "top_predictive_factors": [
                "Debt-to-Income (DTI) Ratio",
                "Loan Interest Rate",
                "Annual Income",
                "Credit Score",
                "Months of Employment"
            ],
            "underwriting_observations": [
                "The model places greater predictive importance on Debt-to-Income (DTI) Ratio and Interest Rate than nominal loan amount.",
                "Subprime credit scores (< 580) combined with DTI > 0.50 represent the highest concentration of predicted defaults.",
                "The presence of a co-signer significantly reduces observed default probability across all income tiers."
            ]
        }
