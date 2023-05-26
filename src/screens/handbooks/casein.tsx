import { useQuery } from "@apollo/client";
import { FC, useMemo, useState } from "react";

import TableHandbook from "components/TableHandbook";

import handbook from "apollo/handbooks";

const CaseIn: FC = () => {
        const [page, setPage] = useState(1)
        const { data, loading } = useQuery(handbook.casein)

        const dataSource: [string, string, string][] = useMemo(() => {
                const array = data?.caseIndexes?.results?.map((item: any) => [item?.case, item?.department?.nameRu, item?.caseName])
                return array || []
        }, [data])

        return (
                <TableHandbook
                        page={page}
                        total={1}
                        col_one="Дело"
                        col_two="Подразделение"
                        col_desc="Заголовок дела"
                        data={dataSource}
                        setPage={setPage}
                />
        )
}

export default CaseIn