// import { useState } from "react";
import "../styles/globals.css";
import Layout from "../component/Layout";

class MyApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      hasError: false,
    };
  }

  componentDidCatch(e, info) {
    // dev会有报错提示UI
    // prod 没有
    this.setState({
      hasError: true,
    })
    console.log("catch error", info);
  }

  render() {
    const { Component, pageProps } = this.props;
    const { count, hasError } = this.state;
    return (
      <Layout>
        {hasError ? (
          <h1>Something went wrong.</h1>
        ) : (
          <Component
            {...pageProps}
            count={count}
            setCount={() =>
              this.setState((pre) => ({
                count: pre.count + 1,
              }))
            }
          />
        )}
      </Layout>
    );
  }
}

// function MyApp({ Component, pageProps }) {
//   const [count, setCount] = useState(0);
//   return (
//     <Layout>
//       <Component {...pageProps} count={count} setCount={setCount} />
//     </Layout>
//   );
// }

export default MyApp;
