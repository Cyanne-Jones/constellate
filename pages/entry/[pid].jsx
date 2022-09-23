import { useRouter } from 'next/router';

const Entry = () => {
  const router = useRouter();
  const { pid } = router.query;

  return (
    <p>Post: {pid}</p>
  )
};

export default Entry;