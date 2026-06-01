AGRABO Angular Favicon Pack

Put these files inside:
src/assets/icons/

Or put favicon.ico directly in:
src/

Recommended Angular index.html tags:

<link rel="icon" type="image/x-icon" href="favicon.ico">
<link rel="icon" type="image/png" sizes="16x16" href="assets/icons/favicon-16x16.png">
<link rel="icon" type="image/png" sizes="32x32" href="assets/icons/favicon-32x32.png">
<link rel="apple-touch-icon" sizes="180x180" href="assets/icons/apple-touch-icon.png">
<link rel="manifest" href="assets/icons/site.webmanifest">
<meta name="theme-color" content="#7A2E00">

If you put favicon.ico in src/assets/icons instead of src, change the first line to:
<link rel="icon" type="image/x-icon" href="assets/icons/favicon.ico">
