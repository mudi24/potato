import { createBrowserHistory } from 'history';

const ENV = process.env.NODE_ENV;
let publicUrl: string = '';

if (ENV === 'development') {
  publicUrl = '/';
} else if (ENV === 'production') {
  publicUrl = '/potato';
}

const history = createBrowserHistory({
  basename: publicUrl
})
// const history = createBrowserHistory()

export default history