import { Link } from "react-router-dom";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { FaAngleDown } from "react-icons/fa6";
import moment from "moment";
import Button from "~/components/button";
import data from "~/utils/data/dataset.json";
import DatesetIllustration from "~/assets/illustrations/dataset.png";
import OrganizationIllustration from "~/assets/illustrations/organization.png";

export default function Dashboard() {
  return (
    <>
      <main className="p-6 px-8 pb-12">
        <header className="flex items-center gap-8 justify-between">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <Button className="!rounded !py-0 !px-0">
            <p className="text-white border-r p-6 py-2">Add</p>
            <FaAngleDown className="mx-2" />
          </Button>
        </header>
        <div className="flex items-center gap-8 py-8">
          <div className="shadow w-[300px] rounded-md bg-red-500 aspect-video p-4 flex flex-col relative overflow-hidden">
            <p className="text-white font-medium">Datasets</p>
            <h1 className="text-4xl font-semibold text-white flex-grow flex items-center break-all">
              {"0"}
            </h1>
            <img
              className={`w-[150px] absolute right-[10px] top-[7px] opacity-50`}
              src={DatesetIllustration}
              alt="dataset illustration"
            />
          </div>
          <div className="shadow w-[300px] rounded-md bg-yellow-500 aspect-video p-4 flex flex-col relative overflow-hidden">
            <p className="text-white font-medium">Organizations</p>
            <h1 className="text-4xl font-semibold text-white flex-grow flex items-center break-all">
              {"0"}
            </h1>
            <img
              className={`w-[114px] absolute right-[15px] top-[33px] opacity-50`}
              src={OrganizationIllustration}
              alt="organizations illustration"
            />
          </div>
        </div>
        <div className="pt-4">
          <h1 className="text-xl font-semibold p-4">Latest dataset created</h1>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell align="left">Created by</TableCell>
                  <TableCell align="left">Created at</TableCell>
                  <TableCell align="left">Updated at</TableCell>
                  <TableCell align="left">Views</TableCell>
                  <TableCell align="left">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item, index) => {
                  const { title, organization, user, updatedAt } = item;

                  return (
                    <TableRow
                      key={index + 1}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {title}
                      </TableCell>
                      <TableCell align="left">
                        {organization ? (
                          <Link
                            className="text-primary-600 capitalize hover:underline relative z-10"
                            to={`/organizations/${organization.slug}`}
                          >
                            {organization.name}
                          </Link>
                        ) : user ? (
                          <span className="capitalize">{`${user.firstName} ${user.lastName}`}</span>
                        ) : (
                          "-------"
                        )}
                      </TableCell>
                      <TableCell align="left">
                        {moment(Date.now()).format("Do MMM, YYYY")}
                      </TableCell>
                      <TableCell align="left">{moment(updatedAt).fromNow()}</TableCell>
                      <TableCell align="left">{Math.floor(Math.random() * 1000) + 1}</TableCell>
                      <TableCell align="left">
                        {(index + 1) % 2 === 0 ? (
                          <p className="text-orange-500 font-medium">Pending</p>
                        ) : (
                          <p className="text-green-500 font-medium">Published</p>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </main>
    </>
  );
}
