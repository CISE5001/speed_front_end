import NavigationBar from '../../components/navigationbar/NavigationBar';
import Head from 'next/head';
import axios from 'axios';

export default function ArticleDetails({ submittedArticles }: HomeProps) {
    
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Head>
                <title>Article Details</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <NavigationBar />

            <main className="flex-1 p-6 md:p-12">
                <h1 className="text-4xl font-bold mb-10 text-center text-blue-600">Article Details</h1>

                <div className="bg-white p-6 md:p-10 rounded shadow-md">
                    <p className="mb-4 text-xl font-medium text-gray-700">Title: 
                        <span className="ml-2 font-normal text-gray-600">{submittedArticles.articleTitle}</span>
                    </p>
                    <p className="mb-4 text-xl font-medium text-gray-700">Practice: 
                        <span className="ml-2 font-normal text-gray-600">{submittedArticles.articlePractice}</span>
                    </p>
                    <p className="mb-4 text-xl font-medium text-gray-700">Claim: 
                        <span className="ml-2 font-normal text-gray-600">{submittedArticles.articleClaim}</span>
                    </p>
                    <p className="mb-4 text-xl font-medium text-gray-700">Evidence: 
                        <span className="ml-2 font-normal text-gray-600">{submittedArticles.articleEvidence}</span>
                    </p>
                    <p className="mb-4 text-xl font-medium text-gray-700">Citation: 
                        <span className="ml-2 font-normal text-gray-600">{submittedArticles.articleCitation}</span>
                    </p>
                    <p className="mb-4 text-xl font-medium text-gray-700">Date published: 
                        <span className="ml-2 font-normal text-gray-600">{submittedArticles.dateSubmitted}</span>
                    </p>
                </div>
            </main>      
        </div>
    );
}


export async function getServerSideProps(context: any) {
  const id = context.query.id;
  console.log(id);
  console.log("In getServerSideProps");
  console.log(`https://speed-back-end-git-feature-working-cise5001.vercel.app/api/articles/${id}`);

  try {
    const response = await axios.get(`https://speed-back-end-git-feature-working-cise5001.vercel.app/api/articles/${id}`);

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
  articlePractice: string,
  articleClaim: string,
  articleEvidence: string,
  articleCitation: string,
  status: string;
};

type HomeProps = {
  submittedArticles: Article;
};