// Fill out your copyright notice in the Description page of Project Settings.

#include "SmallRTS.h"
#include "SmallWorld.h"


// Sets default values
ASmallWorld::ASmallWorld()
{
 	// Set this actor to call Tick() every frame.  You can turn this off to improve performance if you don't need it.
	PrimaryActorTick.bCanEverTick = true;

	mesh = CreateDefaultSubobject<UProceduralMeshComponent>(TEXT("GeneratedMesh"));
	RootComponent = mesh;
}

// Called when the game starts or when spawned
void ASmallWorld::BeginPlay()
{
	Super::BeginPlay();
	
	GenerateWorld();
}

void ASmallWorld::GenerateWorld()
{
	// Generate vertices
	float half = FMath::FloorToInt(height / 2.0f);
	float x = 0;
	float y = 0;
	float z = float(radius);
	
	float deltaZ = radius / (half + 1);
	float deltaAngle = 2.0f * PI / width;
	float capRadius = 0;
	float capAngle = 0;

	vertices.Add(FVector(0, 0, z));

	for (int32 i = half; i >= -half; i -= 1) {
		z -= deltaZ;
		capRadius = FMath::Sqrt(radius * radius - z * z);
		capAngle = 2.0f * PI;

		for (int32 j = 0; j < width; j += 1) {
			capAngle -= deltaAngle;

			x = capRadius * FMath::Sin(capAngle);
			y = capRadius * FMath::Cos(capAngle);

			vertices.Add(FVector(x, y, z));
		}
	}

	z = -radius;

	vertices.Add(FVector(0, 0, z));

	// Generate triangles
	for (int32 i = 0; i < width; i += 1) {
		triangles.Add(0);
		triangles.Add(i + 1);
		triangles.Add((i + 2) % int32(width));
	}

	for (int32 i = 0; i < height; i += 1) {
		for (int32 j = 0; j < width; j += 1) {
			triangles.Add((j + 1) + i * width);
			triangles.Add((j + 1) + (i + 1) * width);
			triangles.Add((j + 2) % int32(width) + (i + 1) * width);

			triangles.Add((j + 1) + i * width);
			triangles.Add((j + 2) % int32(width) + (i + 1) * width);
			triangles.Add((j + 2) + i * width);
		}
	}

	/*for (int32 i = 0; i < width; i += 1) {
		triangles.Add(0);
		triangles.Add(i + 1);
		triangles.Add((i + 2) % int32(width));
	}*/
	mesh->CreateMeshSection(1, vertices, triangles, TArray<FVector>(), TArray<FVector2D>(), TArray<FColor>(), TArray<FProcMeshTangent>(), false);
}

// Called every frame
void ASmallWorld::Tick(float DeltaTime)
{
	Super::Tick(DeltaTime);

}

