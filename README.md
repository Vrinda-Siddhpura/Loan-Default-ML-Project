# LoanShield AI: Enterprise Loan Default Prediction System

🚀 **[Live Demo](https://loan-default-ml-project-sigma.vercel.app/)**

An enterprise-grade Machine Learning web application for loan default prediction.

[![Darshan University ML SOP](https://img.shields.io/badge/Darshan%20University-ML%20SOP%20Compliant-blue.svg)](file:///d:/Projects/ML/ML_SOP_Project.pdf)
[![Python](https://img.shields.io/badge/Python-3.13-3776AB.svg?logo=python&logoColor=white)](https://python.org)
[![Scikit-Learn](https://img.shields.io/badge/Scikit--Learn-1.0+-F7931E.svg?logo=scikitlearn&logoColor=white)](https://scikit-learn.org)
[![Flask](https://img.shields.io/badge/Flask-REST%20API-000000.svg?logo=flask&logoColor=white)](https://flask.palletsprojects.com)
[![React](https://img.shields.io/badge/React-18-61DAFB.svg?logo=react&logoColor=black)](https://react.dev)

An enterprise-grade, end-to-end Machine Learning web application designed to assess, predict, and diagnose loan default risk from banking applicant records. Built strictly in compliance with the **Darshan University Computer Engineering Department ML Project SOP (Weeks 1–10)**.

---

## 1. System Architecture

The application replaces monolithic prototypes with a decoupled, modern 4-tier architecture:

```text
┌─────────────────────────────────────────────────────────────┐
│                   React.js Frontend (Vite)                  │
│                                                             │
│  [Dashboard]   [Prediction]   [Model Info]   [Analytics]    │
│  • KPI Cards   • Multi-column • Architecture • ROC/PR Curves│
│  • Risk Gauge  • Persona test • Benchmark    • Feature Imp. │
└──────────────────────────────┬──────────────────────────────┘
                               │
                       HTTP / JSON (REST)
                               │
┌──────────────────────────────▼──────────────────────────────┐
│                    Flask REST API Backend                   │
│                                                             │
│  /api/health        -> Health & model status                │
│  /api/predict       -> Real-time loan inference & risk tier │
│  /api/model-details -> Model specs & hyperparameters        │
│  /api/metrics       -> Test metrics & CV scores             │
│  /api/insights      -> Dataset distributions & EDA          │
│  /api/plots/<name>  -> High-resolution diagnostic plots     │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                 Trained Scikit-Learn Pipeline               │
│                                                             │
│  Input Features -> ColumnTransformer -> Scaler/OneHot ->    │
│  Tuned Classifier (HistGradientBoosting with Class Weights) │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. ML SOP Compliance Matrix (Weeks 1 to 10)

| Week | SOP Objective | Implementation Details | Status |
| :--- | :--- | :--- | :---: |
| **Week 1** | Problem Definition & Dataset Exploration | Analyzed 255,347 loan records across 18 variables; identified 88.4% vs 11.6% class imbalance. | **Complete** |
| **Week 2** | Data Cleaning & Preprocessing | Implemented leakage-safe `ColumnTransformer` with `StandardScaler` and `OneHotEncoder(drop='first')`. Saved to `models/preprocessor.pkl`. | **Complete** |
| **Week 3** | Algorithm from Scratch (Mandatory) | Implemented pure NumPy `ScratchLogisticRegression` with Sigmoid, BCE Loss, and Gradient Descent in `scratch_logistic_regression.py`. Benchmarked against Scikit-Learn. | **Complete** |
| **Week 4** | Model Evaluation & Overfitting Checks | Computed Confusion Matrix, Accuracy, Precision, Recall, F1, ROC-AUC, and PR-AUC. Evaluated Train vs Test performance curves. | **Complete** |
| **Week 5** | Advanced Model Training & Tuning | Benchmarked 6 algorithms (Balanced Logistic Regression, Random Forest, HistGradientBoosting, AdaBoost, Gradient Boosting). Performed 5-Fold Stratified CV and `RandomizedSearchCV`. | **Complete** |
| **Week 6** | Performance Visualizations | Generated 6 high-res plots: ROC curve, PR curve, Confusion Matrix, Feature Importance, Learning curve, and Scratch Loss curve in `artifacts/plots/`. | **Complete** |
| **Week 7** | Flask Project Setup | Created modular Flask REST API in `backend/app.py` with structured JSON error handling and CORS support. | **Complete** |
| **Week 8** | Front-End UI Development | Created modern React.js frontend with dark fintech theme, responsive input form, and instant test personas. | **Complete** |
| **Week 9** | Backend Integration & Deployment | Connected React UI to Flask endpoints (`/api/predict`), added automated risk tiering (Low/Moderate/High), and created `run_all.py` runner. | **Complete** |
| **Week 10** | Project Evaluation Readiness | Clean directory structure, reproducible training script (`train_pipeline.py`), metadata exports, and viva preparation guide. | **Complete** |

---

## 3. Machine Learning Methodology

### 3.1 Class Imbalance Handling
- **Observed Distribution:**
  - Non-Default ($y = 0$): 225,694 ($88.38\%$)
  - Default ($y = 1$): 29,653 ($11.61\%$)
  - Ratio: $\approx 7.61 : 1$
- **Strategy:**
  1. Utilized `class_weight='balanced'` to inversely weight errors on the minority class during training.
  2. Analyzed decision thresholds across $[0.30, 0.40, 0.50, 0.60, 0.70]$ to calibrate the Precision-Recall tradeoff according to banking risk tolerance.

### 3.2 Scratch Logistic Regression (NumPy)
Implemented strictly from first principles without Scikit-Learn in `scratch_logistic_regression.py`:
- **Hypothesis (Sigmoid):**
  $$h_\theta(x) = \sigma(w^T x + b) = \frac{1}{1 + e^{-(w^T x + b)}}$$
- **Binary Cross-Entropy Loss (Log-Loss):**
  $$J(w, b) = -\frac{1}{m} \sum_{i=1}^{m} \left[ y^{(i)} \log(h_\theta(x^{(i)})) + (1 - y^{(i)}) \log(1 - h_\theta(x^{(i)})) \right] + \frac{\lambda}{2m} \|w\|^2$$
- **Vectorized Gradients:**
  $$\frac{\partial J}{\partial w} = \frac{1}{m} X^T (h - y) + \frac{\lambda}{m} w, \quad \frac{\partial J}{\partial b} = \frac{1}{m} \sum (h - y)$$

---

## 4. Model Benchmark & Evaluation Summary

| Model Architecture | Accuracy | Precision | Recall | F1 Score | ROC-AUC | PR-AUC |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **HistGradientBoosting (Balanced) ★** | **70.6%** | **23.9%** | **70.1%** | **0.356** | **0.758** | **0.298** |
| Random Forest (Balanced) | 71.2% | 23.4% | 66.8% | 0.347 | 0.749 | 0.287 |
| Balanced Logistic Regression | 67.8% | 21.6% | 68.3% | 0.328 | 0.741 | 0.279 |
| Baseline Logistic Regression | 88.4% | 0.0% | 0.0% | 0.000 | 0.741 | 0.279 |
| Scratch Logistic Regression (NumPy) | 88.4% | 0.0% | 0.0% | 0.000 | 0.740 | 0.277 |
| AdaBoost Classifier | 88.4% | 51.4% | 5.2% | 0.095 | 0.752 | 0.291 |

> [!NOTE]
> Notice how unweighted models (Baseline Scikit-Learn and Scratch Logistic Regression) achieve 88.4% accuracy simply by predicting the majority class, resulting in 0% recall on defaults. The **Class-Weighted HistGradientBoosting** model successfully identifies over **70% of all defaulting borrowers**, providing actionable protection for loan underwriting.

---

## 5. Quick Start Guide

### Prerequisites
- Python 3.10+
- Node.js v18+ and npm

### 1-Click Launch (Runs Backend + Frontend)
```bash
python run_all.py
```

### Manual Step-by-Step Launch

#### 1. Train the Pipeline & Generate Artifacts (if not already trained)
```bash
python train_pipeline.py
```

#### 2. Start the Flask REST API Backend
```bash
python backend/app.py
# Running on http://127.0.0.1:5000
```

#### 3. Start the React Frontend
```bash
cd frontend
npm install
npm run dev
# Running on http://localhost:3000
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 6. Project Directory Structure

```text
ML/
├── DataSet/
│   └── Loan_default.csv             # Primary dataset (255,347 records, 18 columns)
├── models/
│   ├── best_pipeline.pkl            # Final production pipeline (ColumnTransformer + Model)
│   ├── preprocessor.pkl             # Standalone ColumnTransformer artifact
│   └── model_metadata.json          # Architecture, parameters, and test metrics
├── artifacts/
│   ├── plots/
│   │   ├── roc_curve.png            # ROC-AUC comparison curve
│   │   ├── precision_recall_curve.png# Precision-Recall curve
│   │   ├── confusion_matrix.png     # Production model confusion matrix
│   │   ├── feature_importance.png   # Top 10 Permutation Feature Importances
│   │   ├── learning_curve.png       # Training vs Validation score curve
│   │   └── scratch_logistic_loss.png# Scratch Logistic Regression loss convergence
│   └── metrics/
│       ├── model_comparison.csv     # Test benchmark metrics across all models
│       ├── cross_validation.csv     # 5-fold Stratified CV results (Mean ± Std)
│       ├── feature_importance.csv   # Ranked feature importances
│       └── threshold_analysis.csv   # Precision/Recall trade-off across thresholds
├── backend/
│   ├── app.py                       # Flask REST API backend
│   └── requirements.txt             # Python backend dependencies
├── frontend/
│   ├── package.json                 # React 18, Vite, Lucide React dependencies
│   ├── vite.config.js               # Dev server configuration with API proxy
│   ├── index.html                   # HTML entry point with modern typography
│   └── src/
│       ├── main.jsx                 # React root mount
│       ├── App.jsx                  # Main application state & tab manager
│       ├── index.css                # Enterprise dark fintech styling
│       └── components/
│           ├── Navbar.jsx           # Top navigation with live API health badge
│           ├── Dashboard.jsx        # Executive KPIs, persona tests, architecture
│           ├── PredictionForm.jsx   # Interactive risk form with probability gauge
│           ├── ModelDetails.jsx     # Production model specs, benchmarks, scratch math
│           ├── Analytics.jsx        # High-resolution diagnostic plot viewer
│           └── Insights.jsx         # EDA summaries and underwriting takeaways
├── scratch_logistic_regression.py   # Pure NumPy Scratch Logistic Regression class
├── train_pipeline.py                # Master reproducible training script
├── run_all.py                       # Convenience launcher for both services
└── README.md                        # Complete project documentation
```

---

## 7. Viva & Evaluation Preparation (Week 10 Guide)

### Key Questions & Model Explanations:

1. **Why is Accuracy misleading for this dataset?**
   - *Answer:* The dataset has an 88.4% to 11.6% class imbalance. A trivial model that classifies every single applicant as "Non-Default" would achieve 88.4% accuracy, yet fail to detect 100% of defaulting loans, leading to catastrophic credit losses.

2. **How did you address the class imbalance?**
   - *Answer:* We implemented `class_weight='balanced'` in our classifiers (which dynamically weights the minority class inversely proportional to class frequencies). Additionally, we conducted threshold analysis across probability levels $[0.30 - 0.70]$ to calibrate the decision boundary.

3. **How does your Scratch Logistic Regression work?**
   - *Answer:* It uses a Sigmoid activation function bounded with numerical clipping, computes Binary Cross-Entropy loss with L2 regularization, and calculates analytical gradients via vectorized matrix multiplication ($X^T (h - y)$). Parameters are updated iteratively over 800 epochs using batch gradient descent.

4. **What are the top drivers of loan default?**
   - *Answer:* Permutation importance reveals that **Debt-to-Income (DTI) Ratio**, **Interest Rate**, **Income**, and **Credit Score** have the highest predictive weight. Higher interest rates and elevated DTI strongly increase default risk, while a co-signer significantly lowers default risk.
"# Veyra-AI" 
