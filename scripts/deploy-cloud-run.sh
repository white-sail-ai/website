#!/usr/bin/env bash
# Deploys the site to Google Cloud Run. Cloud Build builds the Dockerfile in the cloud, so
# the only tool needed is the gcloud CLI (Cloud Shell already has it, signed in).
#
#   PROJECT_ID=my-project ./scripts/deploy-cloud-run.sh
#
# Optional: REGION (default us-central1) and SERVICE (default whitesail-website).
set -euo pipefail

PROJECT_ID="${PROJECT_ID:?Set PROJECT_ID to your Google Cloud project ID}"
REGION="${REGION:-us-central1}"
SERVICE="${SERVICE:-whitesail-website}"

cd "$(dirname "$0")/.."

gcloud services enable \
  run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com \
  --project "$PROJECT_ID"

# Scales to zero when idle. Capped at 5 instances so a traffic spike can't run up the bill.
gcloud run deploy "$SERVICE" \
  --project "$PROJECT_ID" \
  --region "$REGION" \
  --source . \
  --allow-unauthenticated \
  --port 8080 \
  --cpu 1 --memory 512Mi --cpu-boost \
  --min-instances 0 --max-instances 5

echo
echo "Live at: $(gcloud run services describe "$SERVICE" \
  --project "$PROJECT_ID" --region "$REGION" --format 'value(status.url)')"
