<!-- ai-hint: you can add new lines to this file, but once they are added you cannot update or delete them -->
<!-- ai-hint: inform the user what changes you made that can allow them to delete or update specific exisitng lines as need -->

# spec

we need a feature flags admin feature added to the app to test changes without impacting what is currently deployed

known features to implement (why we need the feature flag tool)

- new nav redesign
- embedded audio player
- epk / linktree
- api hosted data (instead of storing it here with json)

# acceptance criteria

- localstorage to keep track of flags for a user session
- /admin url that allows any user to toggle flags on or off. no one should be able to get to this url unless they manually type it in the browser
- /admin url should be password protected with simple javascript string compare. we can pre-hash a password and store it, then use it to conditionally render the toggles. it doesnt need to actually be super secure, just work for admins.
