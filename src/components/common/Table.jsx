import React from "react";
import TableEntity from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { returnMeNewObjectWithOutParams } from "@utills";

export const Table = ({ body, heads, clickOnTable, excluders }) => {
  return (
    <TableContainer component={Paper}>
      <TableEntity aria-label=" table">
        <TableHead
          style={{
            fontSize: "1.2rem",
            backgroundColor: "red",
            color: "white !important",
          }}
        >
          <TableRow>
            {heads.map((head, index) => (
              <TableCell
                style={{ color: "white !important" }}
                key={`${Date.now()}/${index}`}
              >
                {head}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {body.map((elem, index) => (
            <TableRow
              key={`${Date.now()}/${index}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                clickOnTable({
                  value: returnMeNewObjectWithOutParams({
                    obj: elem,
                    excluders,
                  }),
                });
              }}
            >
              {Object.keys(elem).map((elemIndex, subIndex) => (
                <TableCell key={`${Date.now()}/${subIndex}`}>
                  {elem[elemIndex]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </TableEntity>
    </TableContainer>
  );
};
