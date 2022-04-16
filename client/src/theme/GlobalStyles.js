import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
/*
=============== 
Variables
===============
*/

:root {
	/* dark shades of primary color*/
	--footer-background: hsla(152, 100%, 3%, 1);
	--dark-background: hsla(182, 33%, 16%, 1);
	--clr-tertiary: hsla(10, 4%, 29%, 1);
	--clr-secondary: rgb(240, 247, 238);
	--clr-primary: rgb(134, 187, 162);
	--clr-primary-1: hsl(150, 29%, 89%);
	--clr-primary-2: hsl(152, 28%, 78%);
	--clr-primary-3: hsl(152, 28%, 70%);
	--clr-primary-4: hsl(152, 28%, 63%);
	--clr-primary-5: hsl(152, 28%, 63%);
	--clr-primary-6: hsl(152, 17%, 50%);
	--clr-primary-7: hsl(151, 16%, 44%);
	--clr-primary-8: hsl(151, 17%, 32%);
	--clr-primary-9: hsl(155, 18%, 19%);
	--clr-primary-10: hsl(150, 19%, 6%);

	/* darkest grey - used for headings */
	--clr-grey-1: hsl(209, 61%, 16%);
	--clr-grey-2: hsl(211, 39%, 23%);
	--clr-grey-3: hsl(209, 34%, 30%);
	--clr-grey-4: hsl(209, 28%, 39%);
	/* grey used for paragraphs */
	--clr-grey-5: hsl(210, 22%, 49%);
	--clr-grey-6: hsl(209, 23%, 60%);
	--clr-grey-7: hsl(211, 27%, 70%);
	--clr-grey-8: hsl(210, 31%, 80%);
	--clr-grey-9: hsl(212, 33%, 89%);
	--clr-grey-10: hsl(210, 36%, 96%);
	--clr-white: #fff;
	--ff-primary: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
		Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	--transition: all 250ms ease;
	--spacing: 0.25rem;
	--radius: 0.5rem;
	--light-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
	--dark-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}
/*
=============== 
Global Styles
===============
*/

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}
body {
	font-family: var(--ff-primary);
	background: var(--clr-white);
	color: var(--clr-grey-1);
	line-height: 1.5;
	font-size: 0.875rem;
}
ul {
	list-style-type: none;
}
a {
	text-decoration: none;
}
img:not(.nav-logo) {
	width: 100%;
	display: block;
}
/* img:not(.nav-logo) {
  width: 100%;
  display: block;
} */

h1,
h2,
h3,
h4 {
	letter-spacing: var(--spacing);
	text-transform: capitalize;
	line-height: 1.25;
	margin-bottom: 0.75rem;
}
h1 {
	font-size: 3rem;
}
h2 {
	font-size: 2rem;
}
h3 {
	font-size: 1.25rem;
}
h4 {
	font-size: 0.875rem;
}
p {
	margin-bottom: 1.25rem;
	color: var(--clr-grey-5);
}

/*  global classes */

.btn:hover {
	color: var(--clr-primary-1);
	background: var(--clr-primary-8);
}

.btn {
	text-transform: uppercase;
	background: var(--clr-primary);
	color: var(--clr-secondary);
	padding: 0.375rem 1rem;
	letter-spacing: var(--spacing);
	display: inline-block;
	/* font-weight: 700; */
	-webkit-transition: var(--transition);
	transition: var(--transition);
	font-size: 1rem;
	border: 2px solid transparent;
	cursor: pointer;
	font-weight: 700;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
	border-radius: 1rem;
}`
export default GlobalStyles
