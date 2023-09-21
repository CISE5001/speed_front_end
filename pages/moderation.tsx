import Head from 'next/head'
import jsonData from 'data.json'
import styles from '@/pages/index.module.css'

export default function Home() {

  function handleEdit(item:any) {
    console.log("Change status")
  }

  const renderArticles = () => {
    
    return jsonData.submittedArticles.map((item:any, index:any) => (
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
