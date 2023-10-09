import Head from 'next/head';
import axios from 'axios';
import { useEffect, useState } from 'react';
import NavigationBar from './components/navigationbar/NavigationBar';

export default function Moderation({ submittedArticles: initialArticles }: HomeProps) {
  const [submittedArticles, setSubmittedArticles] = useState<Article[]>(initialArticles);

// Handle delete function
const handleDelete = async (articleId: any) => {
  // Prompt the user for confirmation
  const userConfirmed = window.confirm("Are you sure you want to delete this article?");

  // If the user cancels, abort the deletion
  if (!userConfirmed) return;

  try {
    const url = `https://speed-back-end-git-feature-working-cise5001.vercel.app/api/articles/submittedarticles/${articleId}`;
    console.log(url);
    await axios.delete(url);
    const response = await axios.get('https://speed-back-end-git-feature-working-cise5001.vercel.app/api/articles/submittedarticles');

    if (response.data && response.data.submittedArticles) {
      setSubmittedArticles(response.data.submittedArticles);
      console.log("Successfully changed status");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

  const handleStatusChange = async (index: any, approveOrReject: string) => {
    try {
      const url = `https://speed-back-end-git-feature-working-cise5001.vercel.app/api/articles/submittedarticles/${approveOrReject}/${index}`;
      console.log(url);
      await axios.put(url);
      const response = await axios.get('https://speed-back-end-git-feature-working-cise5001.vercel.app/api/articles/submittedarticles');

      if (response.data && response.data.submittedArticles) {
        setSubmittedArticles(response.data.submittedArticles);
        console.log("Successfully changed status");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const renderArticles = () => {
    return submittedArticles.map((item: Article, index: number) => (
      <tr key={index}>
        <td>{item.dateSubmitted}</td>
        <td>{item.articleTitle}</td>
        <td>{item.articlePractice}</td>
        <td>{item.articleClaim}</td>
        <td>{item.articleEvidence}</td>
        <td>{item.articleCitation}</td>
        <td>
          {item.status === "Awaiting Approval" ? (
            <>
              <button
                className={`selectable-button ${item.selected === 'approve' ? 'selected' : ''}`}
                onClick={() => {
                  handleStatusChange(item._id, 'approveArticle');
                  submitApproved(item.dateSubmitted, item.articleTitle, item.articlePractice, item.articleClaim, item.articleEvidence, item.articleCitation, 'approve');
                }}
              >
                Approve
              </button>
              <button
                className={`selectable-button ${item.selected === 'reject' ? 'selected' : ''}`}
                onClick={() => {
                  handleStatusChange(item._id, 'rejectArticle');
                  submitApproved(item.dateSubmitted, item.articleTitle, item.articlePractice, item.articleClaim, item.articleEvidence, item.articleCitation, 'reject');
                }}
              >
                Reject
              </button>
            </>
          ) : (
            <p>No action required</p>
          )}
        </td>
        <td>
          <button 
            onClick={() => handleDelete(item._id)} 
            className="text-red-600 hover:text-red-800">
            Delete
          </button>  
        </td>
      </tr>
    ));
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('https://speed-back-end-git-feature-working-cise5001.vercel.app/api/articles/submittedarticles');

        if (response.data && response.data.submittedArticles) {
          const articlesWithSelected = response.data.submittedArticles.map((article: Article) => ({
            ...article,
            selected: '',
          }));
          setSubmittedArticles(articlesWithSelected);
          console.log("setting articles in useEffect");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Head>
        <title>MODERATION PAGE</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavigationBar />

      <main className="flex-1 p-6">
        <h2 className="text-3xl font-bold mb-4 text-center flex justify-center items-center h-full italic">
          MODERATOR PAGE
        </h2>

        <h3 className="text-xl mb-6">Table of submitted articles</h3>

        <div className="bg-white shadow-md rounded">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Submitted
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Article Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Practice
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Claim
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Evidence
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Citation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Request Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">{renderArticles()}</tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export async function submitApproved(dateSubmitted: any, title: string, practice: any, claim: any, evidence: any, citation: any, action: string) {
  try {
    console.log("Entered submitApproved");
    const url = `https://speed-back-end-git-feature-working-cise5001.vercel.app/api/articles/approvedArticles`;
    console.log(url);
    const postData = {
      dateSubmitted,
      articleTitle: title,
      articlePractice: practice,
      articleClaim: claim,
      articleEvidence: evidence,
      articleCitation: citation,
      status: action === 'approve' ? 'Approved' : 'Rejected',
    };
    console.log(postData);

    const response = await axios.post(url, postData);

    if (response.data && response.data.submittedArticles) {
      console.log("Article submitted to approvedArticles");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function getServerSideProps() {
  try {
    const response = await axios.get('https://speed-back-end-git-feature-working-cise5001.vercel.app/api/articles/submittedarticles', {
    });

    if (response.data && response.data.submittedArticles) {
      return {
        props: {
          submittedArticles: response.data.submittedArticles,
        },
      };
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  return {
    props: {
      submittedArticles: [],
    },
  };
}

type Article = {
  _id: string;
  dateSubmitted: string;
  articleTitle: string;
  articlePractice: string,
  articleClaim: string,
  articleEvidence: string,
  articleCitation: string,
  status: string;
  selected?: string;
};

type HomeProps = {
  submittedArticles: Article[];
};
