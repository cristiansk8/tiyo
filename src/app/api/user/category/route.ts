// app/api/user/categories/route.ts
import prisma from '@/app/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'userId es requerido' },
        { status: 400 }
      );
    }

    // Obtener categorías con estado de selección del usuario
    const userCategories = await prisma.UserCategory.findMany({
      where: { userId },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        }
      }
    });

    const formattedCategories = userCategories.map(uc => ({
      id: uc.category.id,
      name: uc.category.name,
      slug: uc.category.slug,
      selected: uc.selected
    }));

    return NextResponse.json(
      { categories: formattedCategories },
      { 
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET'
        }
      }
    );
  } catch (error) {
    console.error('Error obteniendo categorías:', error);
    return NextResponse.json(
      { error: 'Error en el servidor' },
      { status: 500 }
    );
  }
}
// app/api/user/categories/route.ts
export async function POST(req: Request) {
    try {
      const body = await req.json();
      const { userId, categories } = body;
  
      if (!userId || !categories) {
        return NextResponse.json(
          { error: 'userId y categories son requeridos' },
          { status: 400 }
        );
      }
  
      // Usamos una transacción para asegurar consistencia
      const result = await prisma.$transaction([
        // Eliminar todas las relaciones existentes
        prisma.userCategory.deleteMany({
          where: { userId }
        }),
        // Crear las nuevas relaciones
        prisma.userCategory.createMany({
          data: categories.map((categoryId: number) => ({
            userId,
            categoryId,
            selected: true
          }))
        })
      ]);
  
      return NextResponse.json(
        { 
          message: 'Categorías actualizadas exitosamente',
          count: result[1].count 
        },
        { status: 200 }
      );
    } catch (error) {
      console.error('Error actualizando categorías:', error);
      return NextResponse.json(
        { error: 'Error en el servidor' },
        { status: 500 }
      );
    }
  }

  export async function PUT(req: Request, { params }: { params: { categoryId: string } }) {
    try {
      const categoryId = parseInt(params.categoryId);
      const { userId, selected } = await req.json();
  
      if (!userId || selected === undefined) {
        return NextResponse.json(
          { error: 'userId y selected son requeridos' },
          { status: 400 }
        );
      }
  
      // Actualizar o crear la relación usuario-categoría
      const userCategory = await prisma.userCategory.upsert({
        where: {
          userId_categoryId: {
            userId,
            categoryId
          }
        },
        update: {
          selected
        },
        create: {
          userId,
          categoryId,
          selected
        }
      });
  
      return NextResponse.json(
        { 
          message: 'Estado de categoría actualizado',
          userCategory 
        },
        { status: 200 }
      );
    } catch (error) {
      console.error('Error actualizando categoría:', error);
      return NextResponse.json(
        { error: 'Error en el servidor' },
        { status: 500 }
      );
    }
  }
