import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Terms of use | ${site.name}`,
  description: `The terms that apply when you use the ${site.name} website.`,
};

export default function Terms() {
  return (
    <LegalPage title="Terms of use" updated="November 11, 2026">
      <p>
        These terms apply to your use of this website, run by {site.name} (“we”). By using the
        website, you agree to them.
      </p>

      <h2>The website</h2>
      <p>
        This website describes {site.name} and our services. Its content is for general
        information only. It isn’t investment, legal, or other professional advice, and you
        shouldn’t rely on it as such.
      </p>

      <h2>Early access</h2>
      <p>
        Requesting early access doesn’t create an agreement between us or guarantee access. Any
        use of our services is governed by a separate written agreement.
      </p>

      <h2>Fair use</h2>
      <p>
        Please don’t misuse the website: no automated or bulk form submissions, no attempts to
        disrupt it or gain unauthorized access to it, and no false information in our forms.
      </p>

      <h2>Our content</h2>
      <p>
        The {site.name} name, logo, text, and graphics on this website belong to us.
        You’re welcome to link to the website, but please don’t copy or reuse its content without
        our permission.
      </p>

      <h2>No warranties</h2>
      <p>
        We work to keep the website accurate and available, but we provide it “as is”, without
        warranties of any kind.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the extent the law allows, {site.name} isn’t liable for any indirect or
        consequential loss arising from your use of the website.
      </p>

      <h2>Changes to these terms</h2>
      <p>We may update these terms. The date at the top shows when they last changed.</p>

      <h2>Contact</h2>
      <p>
        Questions about these terms? Email <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalPage>
  );
}
