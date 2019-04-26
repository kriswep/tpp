import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
// import SEO from '../client/src/Card';

// import { Card } from 'estimation-components/dist/estimation-components.cjs';
import App from '../../../client/src/App';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <App />
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
);

export default IndexPage;
