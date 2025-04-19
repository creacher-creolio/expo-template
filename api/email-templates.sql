-- api/email-templates.sql
-- This file contains SQL queries to update Supabase email templates
-- To apply these templates, run this file in the Supabase SQL editor

-- Confirmation template
UPDATE auth.templates
SET template = '<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirm Your Email</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f9f9f9;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 40px 20px;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
    }
    .logo {
      max-width: 120px;
      margin-bottom: 20px;
    }
    h1 {
      color: #222;
      font-size: 24px;
      font-weight: 600;
      margin: 0 0 20px;
    }
    p {
      margin: 0 0 20px;
      color: #555;
    }
    .button {
      display: block;
      width: 100%;
      max-width: 280px;
      margin: 30px auto;
      padding: 12px 20px;
      background-color: #3b82f6;
      color: white;
      text-align: center;
      text-decoration: none;
      font-weight: 600;
      border-radius: 6px;
      transition: background-color 0.2s;
    }
    .button:hover {
      background-color: #2563eb;
    }
    .footer {
      margin-top: 40px;
      text-align: center;
      font-size: 14px;
      color: #777;
    }
    .note {
      font-size: 13px;
      color: #777;
      margin-top: 30px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="YOUR_LOGO_URL" alt="Logo" class="logo" />
      <h1>Confirm Your Email Address</h1>
    </div>
    <p>Hi there,</p>
    <p>Thanks for signing up! Please confirm your email address by clicking the button below:</p>
    <a href="{{ .ConfirmationURL }}" class="button">Confirm Email Address</a>
    <p>This link will expire in 24 hours. If you did not create an account, you can safely ignore this email.</p>
    <p>If the button above doesn''t work, copy and paste this URL into your browser:</p>
    <p style="word-break: break-all; font-size: 14px; color: #666;">{{ .ConfirmationURL }}</p>
    <div class="footer">
      <p>&copy; {{ .CurrentYear }} Your App Name. All rights reserved.</p>
    </div>
  </div>
</body>
</html>'
WHERE template_type = 'confirmation';

-- Invite template
UPDATE auth.templates
SET template = '<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>You''ve Been Invited</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f9f9f9;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 40px 20px;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
    }
    .logo {
      max-width: 120px;
      margin-bottom: 20px;
    }
    h1 {
      color: #222;
      font-size: 24px;
      font-weight: 600;
      margin: 0 0 20px;
    }
    p {
      margin: 0 0 20px;
      color: #555;
    }
    .button {
      display: block;
      width: 100%;
      max-width: 280px;
      margin: 30px auto;
      padding: 12px 20px;
      background-color: #3b82f6;
      color: white;
      text-align: center;
      text-decoration: none;
      font-weight: 600;
      border-radius: 6px;
      transition: background-color 0.2s;
    }
    .button:hover {
      background-color: #2563eb;
    }
    .footer {
      margin-top: 40px;
      text-align: center;
      font-size: 14px;
      color: #777;
    }
    .note {
      font-size: 13px;
      color: #777;
      margin-top: 30px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="YOUR_LOGO_URL" alt="Logo" class="logo" />
      <h1>You''ve Been Invited</h1>
    </div>
    <p>Hello,</p>
    <p>You''ve been invited to join our application. To accept this invitation and create your account, please click the button below:</p>
    <a href="{{ .ConfirmationURL }}" class="button">Accept Invitation</a>
    <p>This invitation will expire in 24 hours. If you weren''t expecting this invitation, you can safely ignore this email.</p>
    <p>If the button above doesn''t work, copy and paste this URL into your browser:</p>
    <p style="word-break: break-all; font-size: 14px; color: #666;">{{ .ConfirmationURL }}</p>
    <div class="footer">
      <p>&copy; {{ .CurrentYear }} Your App Name. All rights reserved.</p>
    </div>
  </div>
</body>
</html>'
WHERE template_type = 'invite';

-- Reset password template
UPDATE auth.templates
SET template = '<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f9f9f9;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 40px 20px;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
    }
    .logo {
      max-width: 120px;
      margin-bottom: 20px;
    }
    h1 {
      color: #222;
      font-size: 24px;
      font-weight: 600;
      margin: 0 0 20px;
    }
    p {
      margin: 0 0 20px;
      color: #555;
    }
    .button {
      display: block;
      width: 100%;
      max-width: 280px;
      margin: 30px auto;
      padding: 12px 20px;
      background-color: #3b82f6;
      color: white;
      text-align: center;
      text-decoration: none;
      font-weight: 600;
      border-radius: 6px;
      transition: background-color 0.2s;
    }
    .button:hover {
      background-color: #2563eb;
    }
    .footer {
      margin-top: 40px;
      text-align: center;
      font-size: 14px;
      color: #777;
    }
    .note {
      font-size: 13px;
      color: #777;
      margin-top: 30px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="YOUR_LOGO_URL" alt="Logo" class="logo" />
      <h1>Reset Your Password</h1>
    </div>
    <p>Hello,</p>
    <p>We received a request to reset your password. If you didn''t make this request, you can safely ignore this email.</p>
    <p>To reset your password, click the button below:</p>
    <a href="{{ .ConfirmationURL }}" class="button">Reset Password</a>
    <p>This link will expire in 24 hours.</p>
    <p>If the button above doesn''t work, copy and paste this URL into your browser:</p>
    <p style="word-break: break-all; font-size: 14px; color: #666;">{{ .ConfirmationURL }}</p>
    <div class="footer">
      <p>&copy; {{ .CurrentYear }} Your App Name. All rights reserved.</p>
    </div>
  </div>
</body>
</html>'
WHERE template_type = 'recovery';

-- Magic link template
UPDATE auth.templates
SET template = '<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Magic Link</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f9f9f9;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 40px 20px;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
    }
    .logo {
      max-width: 120px;
      margin-bottom: 20px;
    }
    h1 {
      color: #222;
      font-size: 24px;
      font-weight: 600;
      margin: 0 0 20px;
    }
    p {
      margin: 0 0 20px;
      color: #555;
    }
    .button {
      display: block;
      width: 100%;
      max-width: 280px;
      margin: 30px auto;
      padding: 12px 20px;
      background-color: #3b82f6;
      color: white;
      text-align: center;
      text-decoration: none;
      font-weight: 600;
      border-radius: 6px;
      transition: background-color 0.2s;
    }
    .button:hover {
      background-color: #2563eb;
    }
    .footer {
      margin-top: 40px;
      text-align: center;
      font-size: 14px;
      color: #777;
    }
    .note {
      font-size: 13px;
      color: #777;
      margin-top: 30px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="YOUR_LOGO_URL" alt="Logo" class="logo" />
      <h1>Your Magic Link</h1>
    </div>
    <p>Hello,</p>
    <p>Here''s your magic link to sign in to your account. This link is valid for 10 minutes.</p>
    <a href="{{ .ConfirmationURL }}" class="button">Sign In</a>
    <p>If you didn''t request this link, you can safely ignore this email.</p>
    <p>If the button above doesn''t work, copy and paste this URL into your browser:</p>
    <p style="word-break: break-all; font-size: 14px; color: #666;">{{ .ConfirmationURL }}</p>
    <div class="note">
      <p>For security reasons, this link will expire in 10 minutes and can only be used once.</p>
    </div>
    <div class="footer">
      <p>&copy; {{ .CurrentYear }} Your App Name. All rights reserved.</p>
    </div>
  </div>
</body>
</html>'
WHERE template_type = 'magic_link';

-- Email change template
UPDATE auth.templates
SET template = '<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirm Email Change</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f9f9f9;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 40px 20px;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
    }
    .logo {
      max-width: 120px;
      margin-bottom: 20px;
    }
    h1 {
      color: #222;
      font-size: 24px;
      font-weight: 600;
      margin: 0 0 20px;
    }
    p {
      margin: 0 0 20px;
      color: #555;
    }
    .button {
      display: block;
      width: 100%;
      max-width: 280px;
      margin: 30px auto;
      padding: 12px 20px;
      background-color: #3b82f6;
      color: white;
      text-align: center;
      text-decoration: none;
      font-weight: 600;
      border-radius: 6px;
      transition: background-color 0.2s;
    }
    .button:hover {
      background-color: #2563eb;
    }
    .footer {
      margin-top: 40px;
      text-align: center;
      font-size: 14px;
      color: #777;
    }
    .note {
      font-size: 13px;
      color: #777;
      margin-top: 30px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="YOUR_LOGO_URL" alt="Logo" class="logo" />
      <h1>Confirm Email Change</h1>
    </div>
    <p>Hello,</p>
    <p>We received a request to change your email address to <strong>{{ .NewEmail }}</strong>. To confirm this change, please click the button below:</p>
    <a href="{{ .ConfirmationURL }}" class="button">Confirm Email Change</a>
    <p>If you didn''t request this change, please contact our support team immediately.</p>
    <p>If the button above doesn''t work, copy and paste this URL into your browser:</p>
    <p style="word-break: break-all; font-size: 14px; color: #666;">{{ .ConfirmationURL }}</p>
    <div class="note">
      <p>For security reasons, this link will expire in 24 hours.</p>
    </div>
    <div class="footer">
      <p>&copy; {{ .CurrentYear }} Your App Name. All rights reserved.</p>
    </div>
  </div>
</body>
</html>'
WHERE template_type = 'email_change';
