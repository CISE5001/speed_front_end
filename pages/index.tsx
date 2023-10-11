import { GetServerSideProps } from 'next';
import SearchBar from "../pages/components/search/SearchBar";
import SortableTable from "../pages/components/table/SortableTable";
import NavigationBar from './components/navigationbar/NavigationBar';
import NotificationWindow from './components/notification/NotificationWindow';
import Head from 'next/head';
import { useRouter } from 'next/router'
import { NextPage } from 'next';
import React, { useEffect, useState } from "react";


interface ArticlesInterface {
  id: string;
  dateSubmitted: String,
  articleTitle: String,
  articlePractice: String,
  articleClaim: String,
  articleEvidence: String,
  articleCitation: String,
}

type ArticlesProps = {
  articles: ArticlesInterface[];
};

const Articles: NextPage<ArticlesProps> = ({ articles }) => {
  const headers: { key: keyof ArticlesInterface; label: string }[] = [
    { key: "articleTitle", label: "Title" },
    { key: "articlePractice", label: "Practice" },
    { key: "articleClaim", label: "Claim" },
    { key: "articleEvidence", label: "Evidence" },
    { key: "articleCitation", label: "Citation" },
    { key: "dateSubmitted", label: "Date" },
  ];

  const [articleTitle, setTitle] = useState("");
  const [searchResults, setSearchResults] = useState<ArticlesInterface[]>([]);
  useEffect(() => {
    setSearchResults(articles);
  }, [articles]);
  const [showNotification, setShowNotification] = useState(false);
  const dateSubmitted = new Date().toISOString();
  const status = "Awaiting Approval";

  const handleSearch = (results: ArticlesInterface[]) => {
    setSearchResults(results);
  };

  const router = useRouter();

  function submitPage() {
    router.push(`/submit`);
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Head>
        <title>Speed application</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavigationBar/>

      <main className="flex-1 p-6">
        {showNotification && (
          <NotificationWindow
            message="Article submitted"
            type="success"
          />
        )}

<div className="flex justify-end">
  <div className="bg-gray-200 rounded p-4 flex items-center mb-4" style={{ width: '100%' }}>
    <span className="text-gray-500 text-2xl mr-2">&#9889;</span>
    <h2 className="text-1xl font-semibold mb-0">Welcome, start searching for articles today!</h2>
  </div>
</div>

<h1 className="text-3xl font-bold text-center mb-6 italic">Home Page</h1>



<div className="flex justify-center">
  <div className="border rounded p-5 flex flex-col items-center">
    <h2 className="text-2xl font-semibold mb-4">Submit an Article for Moderation</h2>
    
    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={e => submitPage()}>Submit now</button>
  </div>
</div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Search for software practices</h2>
          <div className="flex justify-end mb-4">
            <SearchBar onSearch={handleSearch} />
          </div>
          <SortableTable headers={headers} data={searchResults} />
        </div>
      </main>

      <footer className="p-4 bg-gray-800 text-white">
        {}
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

  const articles = topics.map((article: {
    id: any; _id: any; 
    dateSubmitted: any; 
    articleTitle: any; 
    articlePractice: any; 
    articleClaim: any; 
    articleEvidence: any; 
    articleCitation: any; 
    summary: any; 
    status: any;
  }) => ({
    id: article.id ?? article._id,
    dateSubmitted: article.dateSubmitted ?? "no date",
    articleTitle: article.articleTitle ?? "no title",
    articlePractice: article.articlePractice ?? "no practice",
    articleClaim: article.articleClaim ?? "no claim",
    articleEvidence: article.articleEvidence ?? "no evidence",
    articleCitation: article.articleCitation ?? "no citation",
  }));


  return {
    props: {
      articles,
    },
  };
};

export default Articles;
