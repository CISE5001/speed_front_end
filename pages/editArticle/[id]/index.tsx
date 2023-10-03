import axios from "axios"
import React, { useState } from 'react';

export default function Home({submittedArticles}: HomeProps) {

  const [title, setTitle] = useState(submittedArticles && submittedArticles ? submittedArticles.articleTitle : "");
  const [summary, setSummary] = useState("");
  const [citation, setCitation] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;

    const postData = {
      dateSubmitted: formattedDate,
      articleTitle: title,
      articleCitation: citation,
      summary: summary
    }

    try {
      const response = await axios.post('https://speed-back-end-git-feature-working-cise5001.vercel.app/api/articles/', postData);
      console.log(response.data);

      try {
        const url = `https://speed-back-end-git-feature-working-cise5001.vercel.app/api/articles/approvedArticles/completed/${submittedArticles && submittedArticles ? submittedArticles._id : ""}`
        console.log(url)
        const response = await axios.put(url);
    
        if (response.data && response.data.submittedArticles) {
          console.log("Updated Status")
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }

    } catch (error) {
      console.error("Error posting data:", error);
    }
  }

  return (
    <div>
      <h1>Edit Article</h1>
      <p>Title</p>
        <form id="userSubmit" onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="articleTitle" 
            placeholder="Enter article title here"
            value={title}  // Auto-populate the input field with the title value
            onChange={e => setTitle(e.target.value)}  
            />
          <p>Summary</p>
          <input 
            type="text" 
            name="articleTitle" 
            placeholder="Enter article summary here"
            value={summary}
            onChange={e => setSummary(e.target.value)} 
            />
          <p>Citation</p>  
          <input 
            type="text" 
            name="articleTitle" 
            placeholder="Enter article citation here"
            value={citation}
            onChange={e => setCitation(e.target.value)}
            />
            <p><br /></p>
          <input type="submit" value="Submit" />
        </form>
    </div>
  )
}

export async function getServerSideProps(context: any) {
  const id = context.query.id;

  console.log("In getServerSideProps");

  try {
    const response = await axios.get(`https://speed-back-end-git-feature-working-cise5001.vercel.app/api/articles/approvedArticles/${id}`);

    console.log(response.data);

    if (response.data) {
      return {
        props: {
          submittedArticles: response.data
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
  submittedArticles: Article;
};