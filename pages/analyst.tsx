import Head from 'next/head'
import styles from '@/pages/index.module.css'
import axios from 'axios';
import { useRouter } from 'next/router';
import NavigationBar from './components/navigationbar/NavigationBar';

export default function Home({approvedArticles}: HomeProps) {
  
  const router = useRouter();

  function handleEdit(id:any) {
    router.push(`/editArticle/${id}`);
  }

  const renderArticles = () => {
    
    return approvedArticles?.map((item:any, index:any) => (
        <tr key={index}>
          <td>{item.dateSubmitted}</td>
          <td>{item.articleTitle}</td>
          <td>{item.status}</td>
          <td>
              {item.status == "Approved" ? 
              <>
                <button className='detail' onClick={e => handleEdit(item._id)}>View Detail</button>
              </>:
                <button className='delete' onClick={e => handleEdit(item._id)}>Edit</button>
              }
          </td>
        </tr>
    ));
  }

  return (
    <div>
      <Head>
        <title>ANALYST PAGE</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavigationBar/>
      <main>
      <h2>
          Welcome to the Analyst Page
        </h2>
        <h3 className={styles.description}>
          Table of moderated articles
        </h3>
        <br></br>
        <div>
          <table>
            <thead>
              <tr>
                <th>Date Submitted</th>
                <th>Article Title</th>
                <th>Request Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
                { renderArticles() }
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}

// Fetch data on server-side
export async function getServerSideProps() {
  try {
    const response = await axios.get('https://speed-back-end-git-feature-working-cise5001.vercel.app/api/articles/approvedArticles', {
    });

    if (response.data && response.data.approvedArticles) {
      return {
        props: {
          approvedArticles: response.data.approvedArticles
        }
      };
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  return {
    props: {
      approvedArticles: []
    }
  };
}

type Article = {
  _id: string;
  dateSubmitted: string;
  articleTitle: string;
  status: string;
};

type HomeProps = {
  approvedArticles: Article[];
};




