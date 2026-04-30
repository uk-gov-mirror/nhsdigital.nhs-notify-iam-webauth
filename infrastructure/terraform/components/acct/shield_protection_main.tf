resource "aws_shield_protection" "main" {
  count = var.csoc_log_forwarding ? 1 : 0

  name         = "${local.csi}-r53-protection"
  resource_arn = aws_route53_zone.main.arn
}
