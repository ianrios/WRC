<!-- ai-hint: you can add new lines to this file, but once they are added you cannot update or delete them -->
<!-- ai-hint: inform the user what changes you made that can allow them to delete or update specific exisitng lines as need -->

# basic instructions

- respect any comments that start with ai-hint
- act as a staff + software engineer in your development and review
- the user is not always right, do not just agree with everything they want or ask. they are an inexperienced software developer.
- focus on the task at hand and create a curren-plan-xyz.md file to remember what steps we had outlined in order to stay on track
- as we work on the site, lets create and update the .ai documentation as needed. no need to create documentation for the sake of writing lines of code.
- if a file has a comment "ai-hint: do not delete lines", feel free to add to it but inform the user that you cannot delete lines

# write DRY code

- dont add useless comments, code should be self documenting
- use and create shared components and styles when necessary
- do not create abstractions unless the same code is used at least three times - this also goes for scss styles
- unify styles using global and shared styles for a more ui design system approach instead of rewriting styles each time.
- think deeply and provide useful solutions instead of just extracting functions or adding new components that are only used once
