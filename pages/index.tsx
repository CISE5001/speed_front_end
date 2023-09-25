import { GetServerSideProps } from 'next';
import SortableTable from "../pages/components/table/SortableTable";
import Head from 'next/head';
import styles from '@/pages/index.module.css';
import Link from 'next/link';
import { NextPage } from 'next';
import React, { useState } from "react";

interface ArticlesInterface {
  id: string;
  dateSubmitted: String,
  articleTitle: String,
  articleCitation: String,
  summary: String;
}

type ArticlesProps = {
  articles: ArticlesInterface[];
};

const Articles: NextPage<ArticlesProps> = ({ articles }) => {
  const headers: { key: keyof ArticlesInterface; label: string }[] = [
    { key: "dateSubmitted", label: "Title" },
    { key: "articleTitle", label: "Authors" },
    { key: "articleCitation", label: "Source" },
    { key: "summary", label: "Summary" },
  ];

  const [articleTitle, setTitle] = useState("");
  const dateSubmitted = "placeholder";
  const articleCitation = "placeholder";
  const summary = "placeholder";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch('http://speed-back-end-git-feature-working-cise5001.vercel.app/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({dateSubmitted, articleTitle, articleCitation, summary}),
      });

      if (response.ok) {
        console.log('Submission successful');
        // Reset the title state if needed
        setTitle('');
      } else {
        console.log('Submission failed:', response.statusText);
      }
    } catch (error) {
      console.error('There was an error submitting the form:', error);
    }
    console.log(
      JSON.stringify({
        articleTitle, 
        dateSubmitted, 
        articleCitation,
        summary
      })
    );
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Speed application</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Home Page</h1>
        <Link href="/moderator">
          <button>Moderator</button>
        </Link>
        <Link href="/analyst">
          <button>Analyst</button>
        </Link>
        <h2>Submit an Article for Moderation</h2>
        <form id="userSubmit" onSubmit={handleSubmit}>
          <input 
          type="text" 
          name="articleTitle" 
          placeholder="Enter article title here" 
          value={articleTitle}
          onChange={event => setTitle(event.target.value)}
          />
          <input type="submit" value="Submit" />
        </form>
        <div>
          <SortableTable headers={headers} data={articles} />
        </div>
      </main>

      <footer className={styles.footer}>
        {}
      </footer>
    </div>
  );
};

const getTopics = async() => {
  try {
      const res = await fetch('http://speed-back-end-git-feature-working-cise5001.vercel.app/api/articles', {
          cache: 'no-store',
      });

      if(!res.ok) {
          throw new Error("Failed to fetch topics")
      }

      return res.json();
  }
  catch (error) {
      console.log("Error loading topics: ", error);
  }
}

export const getServerSideProps: GetServerSideProps<ArticlesProps> = async (_) => {
  try {
    const { topics } = await getTopics();
    console.log(topics, "Testing String");

    let articles;

    if (!Array.isArray(topics) || topics.length === 0) {
      // Default articles if topics is not an array or is empty
      articles = [
        {
          id: "defaultId",
          dateSubmitted: "defaultDate",
          articleTitle: "defaultTitle",
          articleCitation: "defaultCitation",
          summary: "defaultSummary",
        },
        // Add more default articles as needed
      ];
    } else {
      // Map the data to ensure all articles have consistent property names
      articles = topics.map((article: { 
        id: any; _id: any; dateSubmitted: any; articleTitle: any; articleCitation: any; summary: any; 
      }) => ({
        id: article.id ?? article._id,
        dateSubmitted: article.dateSubmitted,
        articleTitle: article.articleTitle,
        articleCitation: article.articleCitation,
        summary: article.summary,
      }));
    }

    return {
      props: {
        articles,
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);
    // Return a default prop or an error prop
    return {
      props: {
        articles: [], // default empty array
        error: "Failed to fetch articles", // an error message or error code
      },
    };
  }
};

export default Articles; 
