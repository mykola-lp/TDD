#!/usr/bin/env bash
set -e

TIMEZONES=(
  "UTC"
  "America/New_York"
  "America/Los_Angeles"
  "America/Sao_Paulo"
  "Europe/London"
  "Europe/Paris"
  "Europe/Helsinki"
  "Africa/Johannesburg"
  "Asia/Dubai"
  "Asia/Kolkata"
  "Asia/Tokyo"
  "Australia/Sydney"
)

for TZ_NAME in "${TIMEZONES[@]}"; do
  echo "========================================"
  echo "Running tests in timezone: $TZ_NAME"
  echo "========================================"

  TZ="$TZ_NAME" npm run test

  echo
done

echo "All timezone test runs completed."
