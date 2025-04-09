import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '800'],
});
import ReactGTM from 'react-gtm-module';

// GTM Initialization
const gtmId = 'GTM-MQQ53XVJ'; 
const gtmOptions = {
  gtmId,
};

export default function Home() {
  const router = useRouter();

  useEffect(() => {
  ReactGTM.initialize(gtmOptions);
    
    router.push('/home');
  }, [router]);

  return null; 
}
