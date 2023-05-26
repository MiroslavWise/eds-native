import { FC, useState, useMemo } from "react";
import { useQuery } from "@apollo/client";

import TableHandbook from "components/TableHandbook";

import handbook from "apollo/handbooks";





const DocType: FC = () => {
        const [page, setPage] = useState(1)
        const { data, loading } = useQuery(handbook.doctype, 
                {
                        variables: {
                                name: '',
                                offset: (page - 1) * 20
                        }
        })

        const dataSource: [string, string, string][] = useMemo(() => {
                const array = data?.documentTypes?.results?.map((item: any) => [item?.nameRu, item?.nameKz, ""])
                return array || []
        }, [data])

        return (
                <TableHandbook
                        total={data?.documentTypes?.totalCount}
                        page={page}
                        col_one="Наименование (рус)"
                        col_two="Наименование (каз)"
                        col_desc="Предназначение"
                        data={dataSource}
                        setPage={setPage}
                />
        )
}

export default DocType