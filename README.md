# Static Development
Quick boilerplate that gets your static development up and going, super fast.

## Quick Instructions
Run ```npm install``` and your micro express server will be running at ```http://localhost:3000```.

### Gulp
Gulp's configured here to take any JS, CSS, and SCSS and compile them into ```www/css/bundle.min.css``` and ```www/js/bundle.min.js```.

### Compiling Ordering
Often it's important to compile your CSS or JS in a particular order, to maintain basic dependencies. Simply prefix your CSS or JS files with a number to have Gulp compile them in the order you want. (That's why jQuery and Underscore are prefixed with numbers smaller than ```site.js```'s.)
