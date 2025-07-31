import React from 'react';
import { useForm } from 'react-hook-form';

function Formulario({ onSubmit }) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="nome">Nome:</label>
        <input
          id="nome"
          {...register('nome', { required: 'Nome é obrigatório' })}
        />
        {errors.nome && <p>{errors.nome.message}</p>}
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          {...register('email', {
            required: 'Email é obrigatório',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Email inválido',
            },
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="mensagem">Mensagem:</label>
        <textarea
          id="mensagem"
          {...register('mensagem')}
        />
      </div>

      <button type="submit">Gerar PDF</button>
    </form>
  );
}

export default Formulario;