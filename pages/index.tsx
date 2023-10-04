import { GetServerSideProps } from 'next';
import SearchBar from "../pages/components/search/SearchBar";
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
  status: String;
}

type ArticlesProps = {
  articles: ArticlesInterface[];
};

const Articles: NextPage<ArticlesProps> = ({ articles }) => {
  const headers: { key: keyof ArticlesInterface; label: string }[] = [
    { key: "articleTitle", label: "Title" },
    { key: "summary", label: "Summary" },
    { key: "articleCitation", label: "Citation" },
    { key: "dateSubmitted", label: "Date" },
  ];

  const [articleTitle, setTitle] = useState("");
  const [searchResults, setSearchResults] = useState<ArticlesInterface[]>([]);
  const dateSubmitted = new Date().toISOString();
  const status = "Awaiting Approval";

  const handleSearch = (results: ArticlesInterface[]) => {
    setSearchResults(results);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch('https://speed-back-end-git-feature-working-cise5001.vercel.app/api/articles/submittedarticles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dateSubmitted, articleTitle, status }),
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
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Speed application</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="horizontal-color-bar">

              <Link href="/">
                <button className={styles.button}>Home</button>
              </Link>
              <Link href="/moderation">
                <button className={styles.button}>Moderator</button>
              </Link>
              <Link href="/analyst">
                <button className={styles.button}>Analyst</button>
              </Link>
        </div>

      <main>
        <h1><center>Home Page</center></h1>
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
            <h2>Search for articles by title keywords</h2>
            <center><SearchBar onSearch={handleSearch} /></center>
            <SortableTable headers={headers} data={searchResults} />
          </div>
          <div>
            <h2>All articles</h2>
            <SortableTable headers={headers} data={articles} />
          </div>
      </main>

      <footer className={styles.footer}>
        { }
      </footer>
    </div>
  );
};

const getTopics = async () => {
  try {
    const res = await fetch('http://speed-back-end-git-feature-working-cise5001.vercel.app/api/articles', {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topics")
    }

    return res.json();
  }
  catch (error) {
    console.log("Error loading topics: ", error);
  }
}

export const getServerSideProps: GetServerSideProps<ArticlesProps> = async (_) => {

  console.log("In GetServerSideProps");
  const { topics } = await getTopics();

  console.log("topic count: %d", topics.length);


  // Map the data to ensure all articles have consistent property names
  const articles = topics.map((article: {
    id: any; _id: any; dateSubmitted: any; articleTitle: any; articleCitation: any; summary: any; status: any;
  }) => ({
    id: article.id ?? article._id,
    dateSubmitted: article.dateSubmitted ?? "no date",
    articleTitle: article.articleTitle ?? "no title",
    articleCitation: article.articleCitation ?? "no citation",
    summary: article.summary ?? "no summary",
    status: article.status ?? "no status"
  }));


  return {
    props: {
      articles,
    },
  };
};

export default Articles;
