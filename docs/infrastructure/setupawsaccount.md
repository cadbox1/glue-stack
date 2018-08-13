# Setup AWS Account

1. Create your account on the [AWS Getting Started Page](https://aws.amazon.com/getting-started/).
2. From [Getting Started](https://docs.aws.amazon.com/IAM/latest/UserGuide/getting-started.html), [Create Your First IAM Admin User](https://docs.aws.amazon.com/IAM/latest/UserGuide/getting-started_create-admin-group.html#getting-started_create-admin-group-console).
3. From [Setup MFA](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa_enable_virtual.html), setup IAM for both your root account and new user using the Google Authenticator app.
4. On the [IAM Dashboard](https://console.aws.amazon.com/iam/home#/home), set an alias for your account so you don't need the special url to login.
5. Enable access to the Billing Console for IAM users by following [Delegate Access to the Billing Console](https://docs.aws.amazon.com/IAM/latest/UserGuide/tutorial_billing.html?icmpid=docs_iam_console). Attach the Billing policy to the Administrator group.
6. Log out of your root account and login with your user account.
7. Change your currency preference by going to [My Account](https://console.aws.amazon.com/billing/home), Payment Currency Preference.
8. Create an [AWS Budget](https://aws.amazon.com/aws-cost-management/aws-budgets/) so you don't get charged too much. 

Now you can follow [Setup AWS Cloud Infrastructure](setupawscloudinfrastructure.md).

