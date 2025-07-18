# Code Style Guidelines Compliance

This project follows strict coding standards based on:

- [Airbnb JavaScript ES5 Style Guide](https://github.com/airbnb/javascript/tree/es5-deprecated/es5)
- [Sass Guidelines](https://sass-guidelin.es/)

## ES5 JavaScript Compliance

### ✅ What We Follow:

1. **Variables**: Use `var` for all variable declarations
2. **Functions**: Use function expressions, avoid arrow functions
3. **Strings**: Single quotes, proper concatenation instead of template literals
4. **Semicolons**: Always required
5. **Comments**: JSDoc format for functions
6. **Naming**: camelCase for variables/functions, PascalCase for constructors

### Example ES5 Code:

```javascript
'use strict'

/**
 * Calculates student age from date of birth
 * @param {string} dob - Date of birth in YYYY-MM-DD format
 * @returns {number|string} Age in years or empty string
 */
function calculateAge(dob) {
  if (!dob) {
    return ''
  }

  var currentYear = new Date().getFullYear()
  var birthYear = new Date(dob).getFullYear()
  return currentYear - birthYear
}

// Use traditional for loops
var students = getStudents()
for (var i = 0; i < students.length; i++) {
  console.log('Student: ' + students[i].name)
}
```

## Sass Guidelines Compliance

### ✅ What We Follow:

1. **Architecture**: 7-1 pattern with proper folder structure
2. **Colors**: HSL format preferred over hex
3. **Variables**: Meaningful names, organized in separate files
4. **Mixins**: Documented with SassDoc
5. **Nesting**: Avoided except for pseudo-classes and media queries

### Example Sass Code:

```scss
@charset 'utf-8';

/// Centers content using flexbox
/// @access public
/// @example scss - Usage
///   .centered-element {
///     @include flex-center;
///   }
@mixin flex-center() {
  display: flex;
  align-items: center;
  justify-content: center;
}

// Use HSL colors
$primary: hsl(211, 100%, 50%);
$success: hsl(134, 61%, 41%);

.button {
  @include flex-center;
  background-color: $primary;

  &:hover {
    background-color: darken($primary, 10%);
  }
}
```

## File Structure

```
sass/
├── abstracts/
│   ├── _variables.scss    # Color, typography, spacing variables
│   ├── _functions.scss    # Sass functions
│   ├── _mixins.scss       # Sass mixins
│   └── _placeholders.scss # Sass placeholders
├── base/
│   ├── _reset.scss        # CSS reset/normalize
│   ├── _typography.scss   # Typography rules
│   └── _base.scss         # Base styles
├── components/
│   ├── _buttons.scss      # Button styles
│   ├── _forms.scss        # Form styles
│   └── _tables.scss       # Table styles
├── layout/
│   ├── _header.scss       # Header styles
│   └── _navigation.scss   # Navigation styles
├── pages/
│   ├── _students.scss     # Student page styles
│   └── _classes.scss      # Classes page styles
└── main.scss              # Main import file
```

## Linting

Run these commands to check compliance:

```bash
# JavaScript ES5 linting
npm run lint:js

# Sass linting
npm run lint:scss
```

## Notes

- **Vue Components**: Due to framework requirements, Vue components use modern syntax but business logic follows ES5
- **Build Process**: Vite/Webpack transpiles modern syntax to ES5 for browser compatibility
- **Gradual Migration**: New code should strictly follow ES5 guidelines where possible
