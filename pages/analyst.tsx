import Head from 'next/head'
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
        <td>{item.articlePractice}</td>
        <td>{item.articleClaim}</td>
        <td>{item.articleEvidence}</td>
        <td>{item.articleCitation}</td>
          <td>{item.status}</td>
          <td>
              {item.status == "Approved" ? 
              <>
                <button className='text-blue-500 hover:text-blue-700' onClick={e => handleEdit(item._id)}>View Detail</button>
              </>:
                <button className='text-blue-500 hover:text-blue-700' onClick={e => handleEdit(item._id)}>Edit</button>
              }
          </td>
        </tr>
    ));
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Head>
        <title>ANALYST PAGE</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavigationBar/>

      <main className="flex-1 p-6">
        <h2 className="text-3xl font-bold mb-4 text-center flex justify-center items-center h-full italic">
          ANALYST PAGE
        </h2>
        
        <h3 className="text-xl mb-6">
          Table of moderated articles
        </h3>

        <div className="bg-white shadow-md rounded">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
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
            <tbody className="bg-white divide-y divide-gray-200">
                { renderArticles() }
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
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
  articlePractice: string,
  articleClaim: string,
  articleEvidence: string,
  articleCitation: string,
  status: string;
  selected?: string;
};

type HomeProps = {
  approvedArticles: Article[];
};




