import Head from 'next/head'
import styles from '@/pages/index.module.css'
import axios from 'axios';

export default function Home({approvedArticles}: HomeProps) {

  function handleEdit(item:any) {
    console.log("Change status")
  }

  const renderArticles = () => {
    
    return approvedArticles?.map((item:any, index:any) => (
      <tr key={index}>
        <td>{item.dateSubmitted}</td>
        <td>{item.articleTitle}</td>
        <td>{item.status}</td>
        <td>
            {item.status == "Awaiting Approval" ? 
            <>
              <button className='approve' onClick={e => handleEdit(item)}>Approve</button>
              <button className='reject' onClick={e => handleEdit(item)}>Reject</button>
            </>:
            <p>No action required</p>
            }
        </td>
      </tr>
    ))
  }

  return (
    <div>
      <Head>
        <title>ANALYST PAGE</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main>
      <h2>
          Welcome to the Analyst Page
        </h2>
        <h3 className={styles.description}>
          Table of moderated articles
        </h3>
        <br></br>
        <div>
        <tr>
          <th>Date Submitted</th>
          <th>Article Title</th>
          <th>Request Status</th>
          <th>Actions</th>
        </tr>
        <tbody>
            { renderArticles() }
         </tbody>
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
  dateSubmitted: string;
  articleTitle: string;
  status: string;
  // ... any other fields from the data.json or the API response
};

type HomeProps = {
  approvedArticles: Article[];
};



