import os
import json
import joblib
import pandas as pd
from pathlib import Path

# Path to backend/services -> parent is backend -> parent is project root
BASE_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = BASE_DIR.parent.parent

MODELS_DIR = PROJECT_ROOT / "models"
ARTIFACTS_DIR = PROJECT_ROOT / "artifacts"
PLOTS_DIR = ARTIFACTS_DIR / "plots"
METRICS_DIR = ARTIFACTS_DIR / "metrics"

class ModelService:
    _instance = None

    def __init__(self):
        self.pipeline = None
        self.metadata = None
        self._load_pipeline()
        self._load_metadata()

    @classmethod
    def get_instance(cls):
        if cls._instance is None:
            cls._instance = ModelService()
        return cls._instance

    def _load_pipeline(self):
        pipeline_path = MODELS_DIR / "best_pipeline.pkl"
        if pipeline_path.exists():
            self.pipeline = joblib.load(pipeline_path)
            return self.pipeline
        return None

    def _load_metadata(self):
        meta_path = MODELS_DIR / "model_metadata.json"
        if meta_path.exists():
            with open(meta_path, "r") as f:
                self.metadata = json.load(f)
            return self.metadata
        return None

    def get_pipeline(self):
        if self.pipeline is None:
            self._load_pipeline()
        return self.pipeline

    def get_metadata(self):
        if self.metadata is None:
            self._load_metadata()
        return self.metadata or {}

    def get_metrics(self):
        result = {}
        comp_file = METRICS_DIR / "model_comparison.csv"
        cv_file = METRICS_DIR / "cross_validation.csv"
        feat_file = METRICS_DIR / "feature_importance.csv"
        th_file = METRICS_DIR / "threshold_analysis.csv"

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
