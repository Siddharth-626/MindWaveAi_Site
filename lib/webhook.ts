export async function triggerCRMWebhook(data: {
  name: string;
  email: string;
  company: string;
  phone?: string;
  service: string;
  budget?: string;
  message: string;
  source: string;
  tags: string[];
}) {
  const webhookUrl = process.env.CRM_WEBHOOK_URL;
  if (!webhookUrl) {
    console.warn("CRM_WEBHOOK_URL not configured, skipping webhook");
    return null;
  }

  const payload = {
    contact: {
      first_name: data.name.split(" ")[0],
      last_name: data.name.split(" ").slice(1).join(" ") || "",
      email: data.email,
      phone: data.phone || "",
      company: data.company,
    },
    lead: {
      source: data.source,
      service_interest: data.service,
      budget_range: data.budget || "not-specified",
      message: data.message,
      tags: data.tags,
      status: "new",
      created_at: new Date().toISOString(),
    },
  };

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Webhook-Secret": process.env.CRM_WEBHOOK_SECRET || "",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    console.error("CRM webhook failed:", response.status, await response.text());
    throw new Error(`CRM webhook failed with status ${response.status}`);
  }

  return response.json();
}
