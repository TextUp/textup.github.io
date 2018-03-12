---
title: "Resetting password"
permalink: /articles/security-resetting-password/
excerpt: "How to reset password when you are having difficulty logging in"
---

## Resetting password from login screen

![Login screen]({{ site.baseurl }}/assets/images/password-reset-login.png){: .align-right} Select the **Forgot password** link on the login page.

{% include step-separator.md %}

![Start password reset]({{ site.baseurl }}/assets/images/password-reset-login-start.png){: .align-right} Type in your username. If TextUp can find an account that matches the provided username, TextUp will send an email to the address associated with that account with a reset link.

{% include step-separator.md %}

![Receive reset email]({{ site.baseurl }}/assets/images/password-reset-login-email.png){: .align-right} Select the reset link in the email.

{% include step-separator.md %}

![Enter new password]({{ site.baseurl }}/assets/images/password-reset-login-finish.png){: .align-right} Type in a new password. Then, return to the login page to log in with your new credentials.

{% include step-separator.md %}

## Resetting password from admin dashboard

{% include admin-only.md %}

### Updating password

![Directly change password]({{ site.baseurl }}/assets/images/password-reset-admin-change.png){: .align-right} Admins may reset any user's password by first authenticating with **their own password** then typing in a new password for that particular user.

In the accompanying example, Eric is the admin and Michelle is the user Eric is resetting the password for. Note that we enter **Eric's current password** (not Michelle's current password) into the first field then enter Michelle's new password twice.

{% include step-separator.md %}

### Sending a password reset email

![Trigger password reset]({{ site.baseurl }}/assets/images/password-reset-admin-trigger.png){: .align-right} On the user details page in the admin dashboard, open the **More** menu to reveal an option to send a password reset to the email address associated with this account. This allows the user to come up with their own new password.

{% include step-separator.md %}
