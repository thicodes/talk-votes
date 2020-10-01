import React from "react";
import { useFormik, FormikProvider } from "formik";
import { useMutation, queryCache, MutateConfig } from "react-query";
import { TextField, Modal, Button } from "../ui";
import { fetcher } from "../../fetch";

type Values = {
  title: string;
};

const TalkCreateModal = ({ open, onClose }: any) => {
  const [mutateAddTalk, { isLoading }] = useMutation(
    (data: any) =>
      fetcher("/talks", {
        method: "POST",
        body: data,
      }),
    {
      onMutate: (newTalk: any) => {
        const newTalkUpperCase = {
          ...newTalk,
          title: newTalk.title.toUpperCase(),
        };
        const oldTalks = queryCache.getQueryData("/talks");
        queryCache.setQueryData("/talks", (old: any) => [
          ...old,
          newTalkUpperCase,
        ]);
        return () => queryCache.setQueryData("/talks", oldTalks);
      },
      onError: (error, values, rollback) => rollback(),
      onSettled: () => {
        queryCache.invalidateQueries("/talks");
      },
    }
  );

  const onSubmit = (values: Values, formikAction: any) => {
    const { title } = values;
    const variables = {
      title,
      countVotes: 0,
    };
    const config: MutateConfig<any> = {
      onSuccess: () => {
        formikAction.resetForm();
        onClose();
      },
    };
    mutateAddTalk(variables, config);
  };
  const formik = useFormik<Values>({
    initialValues: {
      title: "",
    },
    onSubmit,
  });

  const { handleSubmit, isValid } = formik;

  return (
    <Modal open={open} title="Adicionar talk" onClose={onClose}>
      <FormikProvider value={formik}>
        <TextField name="title" label="Título da talk" />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          loading={isLoading}
          onClick={handleSubmit as any}
        >
          Salvar
        </Button>
      </FormikProvider>
    </Modal>
  );
};

export default TalkCreateModal;
