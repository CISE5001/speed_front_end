import Head from 'next/head'
import styles from '@/pages/index.module.css'
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Home({submittedArticles: initialArticles }: HomeProps) {
  const [submittedArticles, setSubmittedArticles] = useState<Article[]>(initialArticles);

  const handleStatusChange = async (index: any, approveOrReject: string) => {
    try {
      const url = `https://speed-back-end-git-feature-working-cise5001.vercel.app/api/articles/submittedarticles/${approveOrReject}/${index}`
      console.log(url)
      await axios.put(url);
      const response = await axios.get('https://speed-back-end-git-feature-working-cise5001.vercel.app/api/articles/submittedarticles');

      if(response.data && response.data.submittedArticles) {
          // update local state
        setSubmittedArticles(response.data.submittedArticles);
        console.log("Successfully changed status");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const submitApproved = async (dateSubmitted:any, title: String) => {
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

  const renderArticles = () => {
    
    return submittedArticles.map((item: Article, index:number) => (
      <tr key={index}>
        <td>{item.dateSubmitted}</td>
        <td>{item.articleTitle}</td>
        <td>{item.status}</td>
        <td>
            {item.status == "Awaiting Approval" ? 
            <>
              <button className='approve' onClick={e => {
                handleStatusChange(item._id, 'approveArticle');
                submitApproved(item.dateSubmitted, item.articleTitle);
              }}>Approve</button>
              <button className='reject' onClick={e => handleStatusChange(item._id, 'rejectArticle')}>Reject</button>
            </>:
            <p>No action required</p>
            }
        </td>
      </tr>
    ))
  }

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('https://speed-back-end-git-feature-working-cise5001.vercel.app/api/articles/submittedarticles');
        
        if(response.data && response.data.submittedArticles) {
          setSubmittedArticles(response.data.submittedArticles);
          console.log("setting articles in useEffect");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchArticles();
  }, []);

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