import { handleContactRequest, type ContactEnv } from "./lib/contact-intake";

export interface WorkerEnv extends ContactEnv {
  ASSETS: { fetch: (request: Request) => Promise<Response> };
}

export default {
  async fetch(request: Request, env: WorkerEnv): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === "/api/contact") {
      return handleContactRequest(request, env);
    }
    return env.ASSETS.fetch(request);
  },
};
