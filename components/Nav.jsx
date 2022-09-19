import Link from 'next/link';
import { useRouter } from 'next/router';

const navLinks = [

  { title: 'home', path: '/' },
  { title: 'create', path: '/create' },
  { title: 'login', path: '/login' }

];

export default function Nav() {

  const router= useRouter();

  return (
    <div>
      {navLinks.map(link => (
        <Link key={link.title} href={link.path} passHref>
          <a>
            {link.title}
          </a>
        </Link>
      ))}
    </div>
  )

};