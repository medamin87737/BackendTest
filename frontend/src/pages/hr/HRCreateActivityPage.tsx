import React from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';

type ActivityContext = 'upskilling' | 'expertise' | 'low' | 'medium' | 'expert';

interface CreateActivityFormValues {
  name: string;
  description: string;
  requiredSkills: string;
  desiredLevel: string;
  type: string;
  capacity: number;
  date: string;
  duration: string;
  location: string;
  context: ActivityContext;
}

export const HRCreateActivityPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateActivityFormValues>({
    defaultValues: {
      context: 'upskilling',
    },
  });

  const onSubmit = (data: CreateActivityFormValues) => {
    // À connecter à l'API (POST /api/hr/activities)
    // TODO: Implémenter l'appel API
    console.log('Nouvelle activité RH', data);
  };

  return (
    <div className="space-y-4">
      <header>
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-xl font-semibold text-slate-50"
        >
          Lancer une activité
        </motion.h2>
        <p className="text-sm text-slate-300 max-w-2xl">
          Créez une nouvelle activité de développement (formation, mission, projet) et définissez précisément les
          compétences ciblées.
        </p>
      </header>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-2xl border border-slate-800/80 bg-slate-950/70 backdrop-blur-xl shadow-lg shadow-slate-950/70 p-6 space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-200">Nom de l&apos;activité *</label>
            <input
              type="text"
              {...register('name', { required: 'Le nom est requis' })}
              className="w-full px-3 py-2 rounded-full bg-white/10 border border-white/30 text-xs text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-400"
              placeholder="Ex : Parcours Data Upskilling Q1"
            />
            {errors.name && <p className="text-[11px] text-red-400">{errors.name.message}</p>}
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-200">Type d&apos;activité *</label>
            <select
              {...register('type', { required: 'Le type est requis' })}
              className="w-full px-3 py-2 rounded-full bg-white/10 border border-white/30 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-400"
            >
              <option value="">Sélectionner</option>
              <option value="training">Formation</option>
              <option value="project">Mission / Projet</option>
              <option value="mentoring">Mentorat / Coaching</option>
            </select>
            {errors.type && <p className="text-[11px] text-red-400">{errors.type.message}</p>}
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-200">Nombre de places *</label>
            <input
              type="number"
              min={1}
              {...register('capacity', {
                required: 'Le nombre de places est requis',
                valueAsNumber: true,
              })}
              className="w-full px-3 py-2 rounded-full bg-white/10 border border-white/30 text-xs text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-400"
              placeholder="Ex : 20"
            />
            {errors.capacity && <p className="text-[11px] text-red-400">{errors.capacity.message}</p>}
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-200">Date *</label>
            <input
              type="date"
              {...register('date', { required: 'La date est requise' })}
              className="w-full px-3 py-2 rounded-full bg-white/10 border border-white/30 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-400"
            />
            {errors.date && <p className="text-[11px] text-red-400">{errors.date.message}</p>}
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-200">Durée</label>
            <input
              type="text"
              {...register('duration')}
              className="w-full px-3 py-2 rounded-full bg-white/10 border border-white/30 text-xs text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-400"
              placeholder="Ex : 3 jours, 6 semaines..."
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-200">Localisation</label>
            <input
              type="text"
              {...register('location')}
              className="w-full px-3 py-2 rounded-full bg-white/10 border border-white/30 text-xs text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-400"
              placeholder="Remote, Paris, Casablanca..."
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-200">Description *</label>
          <textarea
            {...register('description', { required: 'La description est requise' })}
            rows={3}
            className="w-full px-3 py-2 rounded-2xl bg-white/10 border border-white/30 text-xs text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-400 resize-none"
            placeholder="Objectifs pédagogiques, public cible, modalités..."
          />
          {errors.description && <p className="text-[11px] text-red-400">{errors.description.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-200">Compétences requises *</label>
            <textarea
              {...register('requiredSkills', { required: 'Les compétences sont requises' })}
              rows={3}
              className="w-full px-3 py-2 rounded-2xl bg-white/10 border border-white/30 text-xs text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-400 resize-none"
              placeholder="Listez les compétences ou mots-clés (Data, Cloud, Soft skills...)"
            />
            {errors.requiredSkills && (
              <p className="text-[11px] text-red-400">{errors.requiredSkills.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-200">Niveau souhaité</label>
            <input
              type="text"
              {...register('desiredLevel')}
              className="w-full px-3 py-2 rounded-full bg-white/10 border border-white/30 text-xs text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-400"
              placeholder="Ex : Junior, Confirmé, Expert..."
            />
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-medium text-slate-200">Contexte de l&apos;activité *</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 text-xs">
            <ContextPill value="upskilling" label="Upskilling" description="Montée en compétences globale" register={register} />
            <ContextPill value="expertise" label="Expertise" description="Consolidation d&apos;un pôle expert" register={register} />
            <ContextPill value="low" label="Low" description="Risque faible sur la compétence" register={register} />
            <ContextPill value="medium" label="Medium" description="Compétence sous tension" register={register} />
            <ContextPill value="expert" label="Expert" description="Compétence critique / rare" register={register} />
          </div>
          {errors.context && <p className="text-[11px] text-red-400">{errors.context.message}</p>}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full bg-white/10 px-5 py-2.5 text-xs font-semibold text-white border border-white/30 hover:bg-white/20"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-full bg-primary-600 px-6 py-2.5 text-xs font-semibold text-white shadow-lg shadow-primary-900/40 hover:bg-primary-500 transition-transform hover:-translate-y-0.5"
          >
            Créer l&apos;activité
          </button>
        </div>
      </form>
    </div>
  );
};

interface ContextPillProps {
  value: ActivityContext;
  label: string;
  description: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any;
}

const ContextPill: React.FC<ContextPillProps> = ({ value, label, description, register }) => {
  return (
    <label className="cursor-pointer rounded-xl border border-white/20 bg-black/20 px-3 py-2 text-left text-[11px] text-slate-100 hover:border-primary-300 transition-colors">
      <input
        type="radio"
        value={value}
        {...register('context', { required: 'Le contexte est requis' })}
        className="sr-only peer"
      />
      <div className="space-y-0.5 peer-checked:bg-primary-600/90 peer-checked:border-primary-300 peer-checked:text-white rounded-lg -mx-2 -my-1 px-2 py-1.5">
        <p className="font-semibold">{label}</p>
        <p className="text-[10px] text-slate-300 peer-checked:text-slate-100">{description}</p>
      </div>
    </label>
  );
};

export default HRCreateActivityPage;

