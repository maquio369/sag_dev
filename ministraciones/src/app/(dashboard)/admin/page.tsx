import { Inter, Roboto_Condensed } from "next/font/google";
const font2 = Roboto_Condensed({ subsets: ["latin"] });

const AdminPage = () => {
  return (
    <div className="p-4 flex gap-4 flex-col xl:flex-row">
      <div className="w-full  lg:w-2/3 ">
        <h1>Admin Page LEFT</h1>
        <div className="w-full  bg-[#fFfFfFb2] rounded-lg shadow-sm p-4">
          <h1>Human LEFT</h1>
          <hr />
          <br />
          <table id="search-table">
            <thead>
              <tr>
                <th>
                  <span className="flex items-center">Company Name</span>
                </th>
                <th>
                  <span className="flex items-center">Ticker</span>
                </th>
                <th>
                  <span className="flex items-center">Stock Price</span>
                </th>
                <th>
                  <span className="flex items-center">
                    Market Capitalization
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  Apple Inc.
                </td>
                <td>AAPL</td>
                <td>$192.58</td>
                <td>$3.04T</td>
              </tr>
              <tr>
                <td className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  Microsoft Corporation
                </td>
                <td>MSFT</td>
                <td>$340.54</td>
                <td>$2.56T</td>
              </tr>
              <tr>
                <td className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  Alphabet Inc.
                </td>
                <td>GOOGL</td>
                <td>$134.12</td>
                <td>$1.72T</td>
              </tr>
              <tr>
                <td className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  Amazon.com Inc.
                </td>
                <td>AMZN</td>
                <td>$138.01</td>
                <td>$1.42T</td>
              </tr>
              <tr>
                <td className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  NVIDIA Corporation
                </td>
                <td>NVDA</td>
                <td>$466.19</td>
                <td>$1.16T</td>
              </tr>
              <tr>
                <td className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  Tesla Inc.
                </td>
                <td>TSLA</td>
                <td>$255.98</td>
                <td>$811.00B</td>
              </tr>
              <tr>
                <td className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  Meta Platforms Inc.
                </td>
                <td>META</td>
                <td>$311.71</td>
                <td>$816.00B</td>
              </tr>
              <tr>
                <td className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  Berkshire Hathaway Inc.
                </td>
                <td>BRK.B</td>
                <td>$354.08</td>
                <td>$783.00B</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="w-full lg:w-1/3 bg-gray-100">
        <h1>Right Page</h1>
        <p className={font2.className}>
          AdminPage Roboto font - <strong>Roboto Condensed BOLD</strong>
        </p>
      </div>
    </div>
  );
};
export default AdminPage;
