"use client";
import React, { useState } from "react";

import { useCoinMarketCup } from "@/core";
import {Loading} from "@/shared";

interface CoinData {
	currency: string;
	value: number;
}

export const CoinMarketCapTable = () => {
	const { coinMarketCup, isLoading, isError } = useCoinMarketCup();
	const [orderBy, setOrderBy] = useState("currency");
	const [order, setOrder] = useState("asc");
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(4);

	const handleRequestSort = (property: string) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};

	const handleChangePage = (newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLSelectElement>,
	) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	if (isLoading || !coinMarketCup || !coinMarketCup.data) {
		return <Loading />;
	}

	if (isError) {
		return <div className="text-red-500">Error...</div>;
	}

	return (
		<div className="w-full mx-auto text-white">
			<div className="overflow-x-auto bg-gray-800 rounded-lg shadow-xl transition-shadow duration-300 hover:shadow-2xl">
				<table className="min-w-full bg-gray-800 rounded-lg">
					<thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-gray-900">
						<tr>
							<th className="py-3 px-4 text-left border-b border-gray-700 xs:text-xs lg:text-sm">
								<button
									onClick={() => handleRequestSort("currency")}
									className={`${
										orderBy === "currency" ? "font-bold" : ""
									} focus:outline-none hover:text-white xs:text-xs lg:text-base`}
								>
									Currency
								</button>
							</th>
							<th className="py-3 px-4 text-left border-b border-gray-700 xs:text-xs lg:text-sm">
								<button
									onClick={() => handleRequestSort("value")}
									className={`${
										orderBy === "value" ? "font-bold" : ""
									} focus:outline-none hover:text-white xs:text-xs lg:text-base`}
								>
									Value
								</button>
							</th>
						</tr>
					</thead>
					<tbody>
						{coinMarketCup?.data
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((row: CoinData) => (
								<tr
									key={row.currency}
									className="hover:bg-gray-700 transition-colors duration-200"
								>
									<td className="py-3 px-4 border-b border-gray-700 xs:text-xs lg:text-sm">
										{row.currency}
									</td>
									<td className="py-3 px-4 border-b border-gray-700 xs:text-xs lg:text-sm">
										{row.value}
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>

			<div className="flex flex-col sm:flex-row justify-between items-center mt-4 space-y-2 sm:space-y-0 text-gray-400">
				<div>
					<label>
						Rows per page:
						<select
							value={rowsPerPage}
							onChange={handleChangeRowsPerPage}
							className="ml-2 p-2 border rounded-md bg-gray-800 text-white border-gray-700"
						>
							<option value={4}>4</option>
							<option value={8}>8</option>
						</select>
					</label>
				</div>
				<div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
					<button
						onClick={() => handleChangePage(page - 1)}
						disabled={page === 0}
						className={`p-2 ${
							page === 0 ? "text-gray-400" : "text-blue-500"
						} focus:outline-none hover:text-blue-400 transition duration-200`}
					>
						Previous
					</button>
					<button
						onClick={() => handleChangePage(page + 1)}
						disabled={
							page >= Math.ceil(coinMarketCup.data.length / rowsPerPage) - 1
						}
						className={`p-2 ${
							page >= Math.ceil(coinMarketCup.data.length / rowsPerPage) - 1
								? "text-gray-400"
								: "text-blue-500"
						} focus:outline-none hover:text-blue-400 transition duration-200`}
					>
						Next
					</button>
				</div>
			</div>

			<div className="text-right mt-4 sm:text-center mt-8">
				<a
					href="https://coinmarketcap.com/"
					target="_blank"
					rel="noopener noreferrer"
					className="text-blue-500 hover:underline hover:text-blue-400 transition duration-200"
				>
					See more at CoinMarketCap
				</a>
			</div>
		</div>
	);
};
