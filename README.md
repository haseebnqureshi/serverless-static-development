# Static Development
Quick boilerplate that gets your static development up and going, super fast.

## Quick Instructions
Run ```npm install``` and your micro express server will be running at ```http://localhost:3000```.

### Partials
Partial HTML templates are loaded via jQuery, and take ```data``` attributes for rendering any partial HTML, mustache style.

### Gulp
Gulp's configured here to take any JS, CSS, and SCSS and compile them into ```dist/css/bundle.min.css``` and ```dist/js/bundle.min.js```.

### Compiling Ordering
Often it's important to compile your CSS or JS in a particular order, to maintain basic dependencies. Simply prefix your CSS or JS files with a number to have Gulp compile them in the order you want. (That's why jQuery and Underscore are prefixed with numbers smaller than ```site.js```'s.)

### Deploying
Most Gulp projects have the entire production website built into ```build``` or ```dist```. Instead, we just build our CSS and JS bundles inside ```dist``` and it's up to you to figure out how to deploy it. (For not at least, this is how we're doing things.)
