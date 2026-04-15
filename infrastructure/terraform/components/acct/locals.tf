locals {
  event_bus_arn = "arn:aws:events:eu-west-2:${var.observability_account_id}:event-bus/nhs-${var.observability_environment}-acct-alerts-bus"

  csoc_event_rule_shield_csoc_arn = var.csoc_log_forwarding ? format("arn:aws:events:%s:%s:event-bus/shield-eventbus",
    var.region,
    var.csoc_destination_account
  ) : null
}
