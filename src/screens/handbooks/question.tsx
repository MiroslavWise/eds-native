import { useQuery } from "@apollo/client";
import { FC, useMemo, useState } from "react";

import TableHandbook from "components/TableHandbook";

import handbook from "apollo/handbooks";

const Question: FC = () => {
        const [page, setPage] = useState(1)
        const [total, setTotal] = useState(0)
        const { data, loading } = useQuery(handbook.question,
                {
                        variables: {
                                name: '',
                                offset: (page - 1) * 20
                        }
        })
        
        const dataSource: [string, string, string][] = useMemo(() => {
                const array = data?.natureQuestions?.results?.map((item: any) => [item?.code, item?.nameRu, item?.nameKz])
                return array || []
        }, [data])

        return (
                <TableHandbook
                        total={total}
                        page={page}
                        col_one="Код документа"
                        col_two="Наименование (рус)"
                        col_desc="Наименование (каз)"
                        data={dataSource}
                        setPage={setPage}
                />
        )
}

export default Question