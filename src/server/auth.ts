import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { createTransport } from "nodemailer";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { env } from "@/env.mjs";
import { cert } from "firebase-admin/app";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string;
      emailVerified: Date | null;
      // ...other properties
      // role: UserRole;
    };
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  adapter: FirestoreAdapter({
    name: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    namingStrategy: "snake_case",
    credential: cert({
      projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: env.FIREBASE_CLIENT_EMAIL,
      privateKey: env.FIREBASE_PRIVATE_KEY,
    }),
  }),
  secret: env.NEXTAUTH_SECRET,
  session: {
    strategy: "database",
  },
  callbacks: {
    session({ session, user }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          emailVerified: user.emailVerified,
        },
      };
    },
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/",
    error: "/auth/error", // Error code passed in query string as ?error=
    verifyRequest: "/auth/verify-request", // (used for check email message)
  },
  debug: env.NODE_ENV === "development",
  providers: [
    GitHubProvider({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    EmailProvider({
      server: {
        host: env.EMAIL_SERVER_HOST,
        port: env.EMAIL_SERVER_PORT,
        auth: {
          user: env.EMAIL_SERVER_USER,
          pass: env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: env.EMAIL_FROM,
      async sendVerificationRequest(params) {
        const { identifier, url, provider } = params;
        const { host } = new URL(url);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        const transport = createTransport(provider.server);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        const result = await transport.sendMail({
          to: identifier,
          from: provider.from,
          subject: `Sign in to ${host}`,
          text: text({ url, host }),
          html: html({ url }),
        });
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        const failed = result.rejected.concat(result.pending).filter(Boolean);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (failed.length) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
          throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`);
        }
      },
    }),
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
function html(params: { url: string }) {
  const { url } = params;

  return `<!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml">
<head>
  <meta charset="utf-8">
  <meta name="x-apple-disable-message-reformatting">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings xmlns:o="urn:schemas-microsoft-com:office:office">
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <style>
    td,th,div,p,a,h1,h2,h3,h4,h5,h6 {font-family: "Segoe UI", sans-serif; mso-line-height-rule: exactly;}
  </style>
  <![endif]-->
  <title>Let's get you signed in</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet" media="screen">
  <style>
    img {
      max-width: 100%;
      vertical-align: middle;
      line-height: 100%;
      border: 0
    }
    .hover-bg-slate-100:hover {
      background-color: #F7F8FA !important
    }
    .hover-bg-primary-600:hover {
      background-color: #003CDF !important
    }
    .hover-text-slate-600:hover {
      color: #585E83 !important
    }
    .hover-text-primary-600:hover {
      color: #003CDF !important
    }
    @media (prefers-color-scheme: dark) {
      .dark-bg-gray-800 {
        background-color: #1E1E1E !important
      }
      .dark-bg-gray-900 {
        background-color: #121212 !important
      }
      .dark-bg-gray-50 {
        background-color: #f9fafb !important
      }
      .dark-bg-gray-600 {
        background-color: #272727 !important
      }
      .dark-text-gray-200 {
        color: #ABABAB !important
      }
      .dark-text-gray-50 {
        color: #f9fafb !important
      }
      .dark-text-gray-800 {
        color: #1E1E1E !important
      }
      .dark-text-gray-900 {
        color: #121212 !important
      }
      .dark-text-primary-500 {
        color: #0047FF !important
      }
      .dark-text-primary-200 {
        color: #94B5FF !important
      }
      .dark-hover-bg-gray-50:hover {
        background-color: #f9fafb !important
      }
      .dark-hover-text-gray-100:hover {
        color: #D5D5D5 !important
      }
      .dark-hover-text-primary-100:hover {
        color: #C6D9FF !important
      }
    }
    @media (max-width: 648px) {
      .sm-mt-0 {
        margin-top: 0 !important
      }
      .sm-block {
        display: block !important
      }
      .sm-hidden {
        display: none !important
      }
      .sm-h-px {
        height: 1px !important
      }
      .sm-w-full {
        width: 100% !important
      }
      .sm-py-3 {
        padding-top: 12px !important;
        padding-bottom: 12px !important
      }
      .sm-px-0 {
        padding-left: 0 !important;
        padding-right: 0 !important
      }
      .sm-px-6 {
        padding-left: 24px !important;
        padding-right: 24px !important
      }
      .sm-leading-10 {
        line-height: 40px !important
      }
    }
  </style>
</head>
<body class="dark-bg-gray-900" style="margin: 0; width: 100%; padding: 0; word-break: break-word; -webkit-font-smoothing: antialiased; background-color: #F7F8FA">
  <div style="display: none">
    Let's get you signed in
    &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847;
  </div>
  <div role="article" aria-roledescription="email" aria-label="Let's get you signed in" lang="en" style="font-size: 16px; font-size: 1rem; font-size: max(16px, 1rem)">
    <table style="width: 100%; font-family: 'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif" cellpadding="0" cellspacing="0" role="presentation">
      <tr>
        <td align="center">
          <!--[if mso]>
          <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="height:300px; mso-width-percent: 1000; position: absolute; left: -10px; top: -20px; z-index: -1;">
            <v:fill type="tile" color="#dee2e9" />
            <v:textbox inset="0,0,0,0">
          <![endif]-->
          <div style="max-height: 40px">
            <div class="dark-bg-gray-900" style="height: 300px; background-color: #DEE2E9"></div>
          </div>
          <!--[if mso]>
            </v:textbox>
          </v:rect>
          <![endif]-->
          <table class="sm-w-full" style="position: relative; max-height: 0; width: 568px; opacity: 0.999" cellpadding="0" cellspacing="0" role="presentation">
            <tr>
              <td style="vertical-align: top" valign="top">
                <div class="sm-px-6">
                  <table style="width: 100%" cellpadding="0" cellspacing="0" role="presentation">
                    <tr>
                      <td class="sm-px-6" style="padding-left: 40px; padding-right: 40px">
                        <table style="width: 100%" cellpadding="0" cellspacing="0" role="presentation">
                          <tr>
                            <td>
                              <a href="https://nextdrive.vercel.app" class="dark-text-gray-50" style="text-decoration: none; font-weight: 700; color: #191847">
                                Next Drive
                              </a>
                            </td>
                            <td align="right">
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                  <div role="separator" style="line-height: 40px">&zwnj;</div>
                  <table class="dark-bg-gray-600" style="width: 100%; border-radius: 8px; background-color: #fff; box-shadow: 0px 10px 10px -5px rgba(0, 0, 0, 0.04), 0px 20px 25px -5px rgba(0, 0, 0, 0.1)" cellpadding="0" cellspacing="0" role="presentation">
                    <tr>
                      <td class="sm-px-6" style="padding: 40px">
                        <table style="width: 100%" cellpadding="0" cellspacing="0" role="presentation">
                          <tr>
                            <td>
                              <h1 class="dark-text-gray-50" style="margin: 0; font-size: 36px; font-weight: 700; line-height: 1; letter-spacing: -0.025em; color: #191847">
                                Let's get you signed in
                              </h1>
                              <div role="separator" style="line-height: 24px">
                                &zwnj;
                              </div>
                              <p class="dark-text-gray-50" style="margin: 0; font-size: 16px; line-height: 26px; color: #191847">
                                We use this easy sign-in button so you don't
                                have to remember or type in yet another long
                                password.
                              </p>
                            </td>
                          </tr>
                          <tr role="separator">
                            <td style="line-height: 24px">&zwnj;</td>
                          </tr>
                          <tr>
                            <td>
                              <a href="${url}" class="sm-block dark-text-primary-500 hover-bg-primary-600 dark-bg-gray-50 dark-hover-bg-gray-50" style="text-decoration: none; display: inline-block; border-radius: 8px; background-color: #0047FF; padding: 14px 24px; text-align: center; font-size: 16px; font-weight: 700; color: #f9fafb; box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.06), 0px 4px 6px -1px rgba(0, 0, 0, 0.1)">
                                <!--[if mso
                                  ]><i
                                    style="
                                      letter-spacing: 24px;
                                      mso-font-width: -100%;
                                      mso-text-raise: 30px;
                                    "
                                    >&nbsp;</i><!
                                [endif]-->
                                <span style="mso-text-raise: 15px">Sign in</span>
                                <!--[if mso
                                  ]><i
                                    style="
                                      letter-spacing: 24px;
                                      mso-font-width: -100%;
                                    "
                                    >&nbsp;</i><!
                                [endif]-->
                              </a>
                              <div role="separator" style="line-height: 24px">
                                &zwnj;
                              </div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </div>
              </td>
            </tr>
          </table>
          <div class="sm-leading-10" role="separator" style="line-height: 64px">&zwnj;</div>
          <table class="sm-w-full dark-text-gray-200" style="width: 568px; color: #767E9D" cellpadding="0" cellspacing="0" role="presentation">
            <tr>
              <td style="padding-left: 40px; padding-right: 40px">
                <a href="https://nextdrive.vercel.app" class="dark-text-gray-50" style="text-decoration: none; font-weight: 700; color: #767E9D">
                  Next Drive
                </a>
                <div style="line-height: 16px">&zwnj;</div>
                <table class="sm-w-full" style="font-size: 12px; line-height: 16px" cellpadding="0" cellspacing="0" role="presentation">
                  <tr>
                    <td class="sm-block sm-w-full">
                      <a href="https://github.com/Mohamed-lifa7/next-drive" class="sm-block sm-py-3 hover-text-slate-600 dark-text-gray-200 dark-hover-text-gray-100" style="text-decoration: none; font-weight: 700; color: #767E9D">
                        Github
                      </a>
                    </td>
                    <td class="sm-block sm-px-0" style="padding-left: 12px; padding-right: 12px">
                      <table class="sm-hidden" cellpadding="0" cellspacing="0" role="presentation">
                        <tr>
                          <td class="dark-bg-gray-800" style="height: 24px; width: 1px; background-color: #DEE2E9"></td>
                        </tr>
                      </table>
                      <!--[if !mso]><!-->
                        <div class="sm-block sm-h-px dark-bg-gray-800" style="mso-hide: all; display: none; background-color: #DEE2E9"></div>
                      <!--<![endif]-->
                    </td>
                    <td class="sm-block sm-w-full">
                      <a href="https://twitter.com/LifaSeddik" class="sm-py-3 hover-text-slate-600 dark-text-gray-200 dark-hover-text-gray-100" style="text-decoration: none; display: block; font-weight: 700; color: #767E9D">
                        Twitter
                      </a>
                    </td>
                    <td class="sm-block sm-px-0" style="padding-left: 12px; padding-right: 12px">
                      <table class="sm-hidden" cellpadding="0" cellspacing="0" role="presentation">
                        <tr>
                          <td class="dark-bg-gray-800" style="height: 24px; width: 1px; background-color: #DEE2E9"></td>
                        </tr>
                      </table>
                      <!--[if !mso]><!-->
                        <div class="sm-block sm-h-px dark-bg-gray-800" style="mso-hide: all; display: none; background-color: #DEE2E9"></div>
                      <!--<![endif]-->
                    </td>
                  </tr>
                </table>
                <hr class="sm-mt-0 dark-bg-gray-800 dark-text-gray-800" style="margin-top: 12px; margin-bottom: 16px; height: 1px; border-width: 0px; background-color: #DEE2E9; color: #DEE2E9">
                <p style="margin: 0; font-size: 12px; line-height: 16px">
                  If you have questions or need help, don't hesitate to contact our
                  support team!
                  <br>
                  <br>
                  Lifa Inc, Algeria, Eloued, Hassani AbdElkerim Zgoum, Bab Elshargi.
                </p>
                <div style="line-height: 16px">&zwnj;</div>
                <table class="sm-w-full" style="font-size: 12px; line-height: 16px" cellpadding="0" cellspacing="0" role="presentation">
                  <tr>
                    <td class="sm-block sm-w-full">
                      <a href="https://nextdrive.vercel.app/terms" class="sm-py-3 hover-text-slate-600 dark-text-gray-200 dark-hover-text-gray-100" style="text-decoration: none; display: block; font-weight: 700; color: #767E9D">
                        Terms &amp; conditions
                      </a>
                    </td>
                    <td class="sm-block sm-px-0" style="padding-left: 12px; padding-right: 12px">
                      <table class="sm-hidden" cellpadding="0" cellspacing="0" role="presentation">
                        <tr>
                          <td class="dark-bg-gray-800" style="height: 24px; width: 1px; background-color: #DEE2E9"></td>
                        </tr>
                      </table>
                      <!--[if !mso]><!-->
                        <div class="sm-block sm-h-px dark-bg-gray-800" style="mso-hide: all; display: none; background-color: #DEE2E9"></div>
                      <!--<![endif]-->
                    </td>
                    <td class="sm-block sm-w-full">
                      <a href="https://nextdrive.vercel.app/privacy" class="sm-py-3 hover-text-slate-600 dark-text-gray-200 dark-hover-text-gray-100" style="text-decoration: none; display: block; font-weight: 700; color: #767E9D">
                        Privacy policy
                      </a>
                    </td>
                    <td class="sm-block sm-px-0" style="padding-left: 12px; padding-right: 12px">
                      <table class="sm-hidden" cellpadding="0" cellspacing="0" role="presentation">
                        <tr>
                          <td class="dark-bg-gray-800" style="height: 24px; width: 1px; background-color: #DEE2E9"></td>
                        </tr>
                      </table>
                      <!--[if !mso]><!-->
                        <div class="sm-block sm-h-px dark-bg-gray-800" style="mso-hide: all; display: none; background-color: #DEE2E9"></div>
                      <!--<![endif]-->
                    </td>
                    <td class="sm-block sm-w-full">
                      <a href="https://nextdrive.vercel.app/contact" class="sm-py-3 hover-text-slate-600 dark-text-gray-200 dark-hover-text-gray-100" style="text-decoration: none; display: block; font-weight: 700; color: #767E9D">
                        Contact us
                      </a>
                    </td>
                    <td class="sm-block sm-px-0" style="mso-hide: all; display: none; padding-left: 12px; padding-right: 12px">
                      <!--[if !mso]><!-->
                        <div class="sm-block sm-h-px dark-bg-gray-800" style="mso-hide: all; display: none; background-color: #DEE2E9"></div>
                      <!--<![endif]-->
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
</body>
</html>`;
}

/** Email Text body (fallback for email clients that don't render HTML, e.g. feature phones) */
function text({ url, host }: { url: string; host: string }) {
  return `Sign in to ${host}\n${url}\n\n`;
}
