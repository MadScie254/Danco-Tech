import { handleContactRequest, type ContactEnv } from "../../src/lib/contact-intake";

export const onRequestPost: PagesFunction<ContactEnv> = async ({ request, env }) => {
  return handleContactRequest(request, env);
};

export const onRequest: PagesFunction<ContactEnv> = async ({ request, env }) => {
  return handleContactRequest(request, env);
};
