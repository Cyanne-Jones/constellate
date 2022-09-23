import { useRouter } from 'next/router';
import Head from 'next/head';
import Nav from '/components/Nav';

const Entry = () => {
  const router = useRouter();
  const { pid } = router.query;

  return (
    <div>
      <Head>
        <title>Journal Entry</title>
      </Head>
      <Nav />
      <p>Post: {pid}</p>
    </div>
  )
};

export default Entry;