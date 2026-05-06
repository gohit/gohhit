export const environment = {
  production: true,
  /**
   * Must end with `/api` — ApiService calls `${apiUrl}/chat`, `/quiz/generate`, etc.
   * Examples: https://your-service.onrender.com/api or https://api.gohhit.com/api
   */
  apiUrl: "https://gohhit-mathbuddy-api.onrender.com/api",
  /**
   * Optional: endpoint that accepts JSON {name,email,message} via POST.
   * If empty, the Contact page falls back to a mailto: draft.
   */
  contactFormEndpoint: "",
};
