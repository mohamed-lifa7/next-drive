const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto p-4">
        <h1 className="mb-8 text-3xl font-semibold">Privacy Policy</h1>

        <div className="rounded-lg p-6 shadow-md">
          <p>Last Updated: September 26, 2023</p>

          <h2 className="mb-2 mt-4 text-xl font-semibold">1. Introduction</h2>
          <p>
            Welcome to Next Drive, a cloud storage and file-sharing service
            provided by NextDrive (&quot;we,&quot; &quot;us,&quot; or
            &quot;our&quot;). This Privacy Policy outlines how we collect, use,
            disclose, and protect your personal information when you use our
            services. By using Next Drive, you agree to the practices described
            in this policy.
          </p>

          {/* ... (previous code) */}

          {/* Privacy Policy Section */}
          <h2 className="mb-2 mt-6 text-xl font-semibold">
            2. Information We Collect
          </h2>
          <p>
            When you use Next Drive, we may collect the following types of
            information:
          </p>
          <ul className="ml-6 list-disc">
            <li>
              Your name, email address, and other contact information you
              provide us.
            </li>
            <li>
              Information about the files you upload, including file names,
              sizes, and timestamps.
            </li>
            <li>
              Usage information, such as your interactions with our service, IP
              address, browser type, and device information.
            </li>
          </ul>

          {/* Use of Information Section */}
          <h2 className="mb-2 mt-6 text-xl font-semibold">
            3. How We Use Your Information
          </h2>
          <p>
            We may use the information we collect for various purposes,
            including but not limited to:
          </p>
          <ul className="ml-6 list-disc">
            <li>Providing and maintaining our services.</li>
            <li>Improving and optimizing our services.</li>
            <li>
              Communicating with you and sending you updates and announcements.
            </li>
            <li>Personalizing your experience on Next Drive.</li>
            <li>
              Protecting our rights and interests, and ensuring the security of
              our service.
            </li>
          </ul>

          {/* Sharing of Information Section */}
          <h2 className="mb-2 mt-6 text-xl font-semibold">
            4. Sharing of Your Information
          </h2>
          <p>
            We may share your information with third parties in the following
            circumstances:
          </p>
          <ul className="ml-6 list-disc">
            <li>With your consent or as you instruct.</li>
            <li>
              With service providers and partners who help us operate and
              improve our services.
            </li>
            <li>
              In response to legal requests, such as court orders or government
              investigations.
            </li>
            <li>
              If Next Drive is involved in a merger, acquisition, or sale of
              assets.
            </li>
          </ul>

          {/* Your Choices Section */}
          <h2 className="mb-2 mt-6 text-xl font-semibold">5. Your Choices</h2>
          <p>You have certain choices regarding your information:</p>
          <ul className="ml-6 list-disc">
            <li>
              You can access and update your personal information through your
              Next Drive account settings.
            </li>
            <li>
              You can choose to delete your account and associated data by
              contacting our support team.
            </li>
            <li>
              You can opt out of receiving promotional communications from us.
            </li>
          </ul>

          {/* Security Section */}
          <h2 className="mb-2 mt-6 text-xl font-semibold">6. Security</h2>
          <p>
            We take reasonable measures to protect your information, but no
            method of transmission or storage is entirely secure. We cannot
            guarantee the security of your data.
          </p>

          {/* Contact Us Section */}
          <h2 className="mb-2 mt-6 text-xl font-semibold">7. Contact Us</h2>
          <p>
            If you have any questions or concerns about our Privacy Policy or
            practices, please contact us at{" "}
            <a href="mailto:privacy@nextdrive.com">privacy@nextdrive.com</a>.
          </p>

          {/* ... (closing tags) */}
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
