import Head from 'next/head'
import styles from '@/pages/index.module.css'
import axios from 'axios';

export default function Home({submittedArticles}: HomeProps) {

  const renderArticles = () => {
    
    return submittedArticles.map((item:any, index:any) => (
      <tr key={index}>
        <td>{item.dateSubmitted}</td>
        <td>{item.articleTitle}</td>
        <td>{item.status}</td>
        <td>
            {item.status == "Awaiting Approval" ? 
            <>
              <button className='approve' onClick={e => {handleEdit(item._id, 'approveArticle'); submitApproved(item.dateSubmitted, item.articleTitle)}}>Approve</button>
              <button className='reject' onClick={e => handleEdit(item._id, 'rejectArticle')}>Reject</button>
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
        <title>MODERATION PAGE</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main>
      <h2>
          Welcome to the Moderation Page
        </h2>
        <h3 className={styles.description}>
          Table of submitted articles
        </h3>
        <br></br>
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
      </main>
    </div>
  )
}

export async function submitApproved(dateSubmitted:any, title: String) {
  try {
    console.log("Entered submitApproved")
    const url = `https://speed-back-end-git-feature-working-cise5001.vercel.app/api/articles/approvedArticles`
    console.log(url)
    const postData = {
      "dateSubmitted": dateSubmitted,
      "articleTitle": title,
      "status": "Approved"
    }
    console.log(postData)

    const response = await axios.post(url, postData);

    if (response.data && response.data.submittedArticles) {
      console.log("Article submitted to approvedArticles")
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function handleEdit(index:any, approveOrReject: String) {
  try {
    const url = `https://speed-back-end-git-feature-working-cise5001.vercel.app/api/articles/submittedarticles/${approveOrReject}/${index}`
    console.log(url)
    const response = await axios.put(url);

    if (response.data && response.data.submittedArticles) {
      console.log("Updated Status")
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Fetch data on server-side
export async function getServerSideProps() {
  try {
    const response = await axios.get('https://speed-back-end-git-feature-working-cise5001.vercel.app/api/articles/submittedarticles', {
    })

    if (response.data && response.data.submittedArticles) {
      return {
        props: {
          submittedArticles: response.data.submittedArticles
        }
      };
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  return {
    props: {
      submittedArticles: []
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
  submittedArticles: Article[];
};



